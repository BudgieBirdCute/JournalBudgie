import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
 } from "firebase/auth";
 import { doc, setDoc } from "firebase/firestore";
 import { db } from "./firebase";

 import { auth } from "./firebase";

export const signUp = async (email, password) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await createUserProfile(userCredential.user);
  return userCredential;
};

 export const logIn = (email, password) => { 
    return signInWithEmailAndPassword(auth, email, password);
 };

 export const logOut = () => {
    return signOut(auth);
 };

 export const listenToAuth = (callback) => {
    return onAuthStateChanged(auth, callback);
 };

 export async function createUserProfile(user) {
   await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email.toLowerCase().trim(),
      createdAt: new Date(),
   }, { merge:true });
 }