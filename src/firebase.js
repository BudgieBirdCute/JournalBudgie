// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeZvEFky2HLOhCTp5WFqAvdfD9t7qMuVg",
  authDomain: "journal-budgie.firebaseapp.com",
  projectId: "journal-budgie",
  storageBucket: "journal-budgie.firebasestorage.app",
  messagingSenderId: "1085962398683",
  appId: "1:1085962398683:web:a7ba805f2ff5edbcd4d5fe"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);