// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCGsFcTfEgsPdk5inLctkYkEbOiqrnmL_I",
  authDomain: "expenses-3ab7e.firebaseapp.com",
  projectId: "expenses-3ab7e",
  storageBucket: "expenses-3ab7e.firebasestorage.app",
  messagingSenderId: "277065833128",
  appId: "1:277065833128:web:69496168dd5f6e9c7cc09d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}
