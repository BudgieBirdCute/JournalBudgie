import { useState } from "react";
import { useAuth } from "./AuthContext";
import { createJournal, inviteToJournal } from "./firestore";


export default function CreateJournal() {
    const { user } = useAuth();

    const [name, setName] = useState("");
    const [emails, setEmails] = useState(["", "", ""]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleEmailChange = (index, value) => {
        const updated = [...emails];
        updated[index] = value;
        setEmails(updated);
    };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const journalId = await createJournal(user.uid, name);

      const validEmails = emails.filter((email) => email.trim() !== "");

      for (const email of validEmails) {
        try {
          await inviteToJournal(journalId, email);
        } catch (err) {
          console.warn(`Couldn't invite ${email}:`, err.message);
        }
      }

      setName("");
      setEmails(["", "", ""]);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Journal name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />

      <p>Invite people (optional):</p>
      {emails.map((email, i) => (
        <input
          key={i}
          type="email"
          placeholder={`Email ${i + 1}`}
          value={email}
          onChange={(e) => handleEmailChange(i, e.target.value)}
        />
      ))}

      {error && <p style={{ color: "red" }}>{error}</p>}

      <button type="submit" disabled={loading}>
        {loading ? "Creating..." : "Create Journal"}
      </button>
    </form>
  );
}