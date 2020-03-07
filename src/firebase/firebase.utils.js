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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;