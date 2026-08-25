import {
    collection, 
    addDoc,
    serverTimestamp,
    query,
    where,
    getDocs,
    doc,
    updateDoc,
    arrayUnion,
    onSnapshot,
    getDoc,
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
    const q = query(usersRef, where("email", "==", email.toLowerCase().trim()));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
        throw new Error("No user was found using that email.");
    }
    const invitedUser = snapshot.docs[0].data();

    await updateDoc(doc(db, "journals", journalId), {
        members: arrayUnion(invitedUser.uid),
    });
}

export async function getUserEmail(uid) {
    const userSnap = await getDoc(doc(db, "users", uid));

    if (!userSnap.exists()) {
        return "Unknown User";
    }

    return userSnap.data().email;
}

export async function getUserJournals(userId) {
    const journalsRef = collection(db, "journals");
    const q = query(journalsRef, where("members", "array-contains", userId));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({ id:doc.id, ...doc.data() }));
}

export function listenToUserJournals(userId, callback) {
    const journalsRef = collection(db, "journals");
    const q = query(journalsRef, where("members", "array-contains", userId));

    return onSnapshot(q, async (snapshot) => {
        const journals = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        
        const journalsWithEmails = await Promise.all(
            journals.map(async (j) => {
                const emails = await Promise.all(j.members.map(getUserEmail));
                return { ...j, memberEmails: emails };
            })
        );
        callback(journalsWithEmails);
    });
}

export async function checkEmailExists(email) {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("email", "==", email.toLowerCase().trim()));
    const snapshot = await getDocs(q);
    return !snapshot.empty;
}