import { useEffect, useState } from "react";
import { getUserJournals, listenToUserJournals, getUserEmail } from "./firestore";
import { useAuth } from "./AuthContext";

export default function MyJournals() {
  const { user } = useAuth();
  const [journals, setJournals] = useState([]);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = listenToUserJournals(user.uid, setJournals);
    return unsubscribe;

  }, [user]);

  if (journals.length === 0) return <p>No journals yet.</p>;

  return (
    <div>
      <h3>My Journals</h3>
      {journals.map((j) => (
        <p key={j.id}>
          {j.name} — ID: {j.id} — Created: {j.createdAt?.toDate?.().toLocaleString() ?? "..."} - Members: {j.memberEmails.join(", ")}

        </p>
      ))}
    </div>
  );
}