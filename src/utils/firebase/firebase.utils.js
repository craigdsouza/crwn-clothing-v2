// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getAuth, 
  signInWithRedirect, 
  signInWithPopup, 
  GoogleAuthProvider
} from 'firebase/auth';

import {
 getFirestore,
 doc, // retrieve documents
 getDoc, // get data
 setDoc // set data
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4uk4yj4L3sUPJwBSfCBkC8E30B4MdsPU",
  authDomain: "crwn-clothing-db-7dad1.firebaseapp.com",
  projectId: "crwn-clothing-db-7dad1",
  storageBucket: "crwn-clothing-db-7dad1.firebasestorage.app",
  messagingSenderId: "1019815202708",
  appId: "1:1019815202708:web:e0aff2b6bfb0dd00018981"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

const signInWithGooglePopup = () => {
  return signInWithPopup(auth, provider);
};

export {auth, provider, signInWithGooglePopup} ;
export default firebaseApp;

// Initialize Firestore
const db = getFirestore(firebaseApp);

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);
  console.log(userDocRef); // Document Reference
  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot.exists()); // another way of checking if the document exists in the database

    if (!userSnapshot.exists()) {  // if the user does not exist in the database
        const { displayName, email } = userAuth;
        await setDoc(userDocRef, {
            displayName,
            email,
            createdAt: new Date()
        });
    } else {
        console.log('User already exists in the database.');
    }

  return userDocRef;
}