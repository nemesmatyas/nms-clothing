import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDf881xxj_fvUo_a9RrMelMs_ecTexslIk",
    authDomain: "nms-db.firebaseapp.com",
    databaseURL: "https://nms-db.firebaseio.com",
    projectId: "nms-db",
    storageBucket: "nms-db.appspot.com",
    messagingSenderId: "576200487677",
    appId: "1:576200487677:web:41faef255deecc77684494",
    measurementId: "G-WZPGLNDRHW"
  };

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if (!userAuth) return;

    // Query Firestore to see if the user object already exists
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    // If querySnapshot doesn't exist at the reference, create a new user
    if (!snapshot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName, email, createdAt, ...additionalData
            }); 
        } catch (err) {
            console.log('Error creating user!', err);
        }
    }

    return userRef;
}

/**
 * Store the Shop data in Firestore
 * @param {string} collectionKey - the name of the collection to store in Firestore
 * @param {array} objectsToAdd - the array of shopping items
 */
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    console.log(collectionRef);

    // Batch the set commands, so the data is predictable (if any request fails, the entire thing fails)
    const batch = firestore.batch();
    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    })

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = collections => {
    const transformedCollection = collections.docs.map(doc => {
        const { title, items } = doc.data();

        return {
            routeName: encodeURI(title.toLowerCase()),
            id: doc.id,
            title,
            items
        }
    })

    return transformedCollection.reduce((accumulator, collection) => {
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {})
}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;