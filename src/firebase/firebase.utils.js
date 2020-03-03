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

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;