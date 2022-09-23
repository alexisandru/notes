// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBXUWUhY3426QtxtYRcR8sZwCIryKrH3ZQ",
  authDomain: "notes-react-85387.firebaseapp.com",
  projectId: "notes-react-85387",
  storageBucket: "notes-react-85387.appspot.com",
  messagingSenderId: "696071711898",
  appId: "1:696071711898:web:2511d9226467a70eb84323"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export const provider = new GoogleAuthProvider()
export const auth = getAuth(app)

export default db