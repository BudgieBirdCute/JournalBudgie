import {
    collection, 
    addDoc,
    serverTimestamp,
    query,
    where,
    getDoc,
    doc,
    updateDoc,
    arrayUnion,
} from "firebase/firestore";

import { db } from "./firebase";

export async function createJournal(userId, name) {
    const journalRef = await addDoc(collection(db, "journals"), {
        name, 
        createdBy: userId,
        members: [userId],
        createdAt: serverTimestamp(),
    });

    return journalRef.id;
}

export async function inviteToJournal(journalId, email) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        throw new Error("No user was found using that email.");
    }
    const invitedUser = snapshot.docs[0].data();

    await updateDoc(doc(db, "journals", journalId), {
        members: arrayUnion(invitedUser.uid),
    });
}