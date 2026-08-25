import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
 } from "firebase/auth";

 import { auth } from "./firebase";

 export function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
 }

 export function login(email, password) { 
    return signInWithEmailAndPassword(auth, email, password);
 }

 export function login() {
    return signOut(auth);
 }