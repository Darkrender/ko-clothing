import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBYg-kw3TS9O1HtXWb6sJb_99GJpDpaqbY",
  authDomain: "ko-db-4db38.firebaseapp.com",
  databaseURL: "https://ko-db-4db38.firebaseio.com",
  projectId: "ko-db-4db38",
  storageBucket: "ko-db-4db38.appspot.com",
  messagingSenderId: "155988745539",
  appId: "1:155988745539:web:da1f759d6d97194ab4e3f6",
  measurementId: "G-GSL03PY224"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return; // if there is no logged in user, do nothing

  const userRef = firestore.doc(`users/${userAuth.uid}`)
  const snapShot = await userRef.get();

  // if the user doesnt exist in the database, create them
  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });

    } catch (error) {
      console.error('error creating user', error.message);
    }
  }

  return userRef;
}

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;