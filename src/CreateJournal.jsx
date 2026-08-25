import { useState } from "react";
import { useAuth } from "./AuthContext";
import { createJournal, inviteToJournal, checkEmailExists } from "./firestore";


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
        const validEmails = emails.filter((email) => email.trim() !== "");

        const checks = await Promise.all(validEmails.map(async (email) => ({
            email,
            exists: await checkEmailExists(email),
        }))
    );

    const notFound = checks.filter((c) => !c.exists).map((c) => c.email);

    if (notFound.length > 0) {
        setError(`No account found for: ${notFound.join(", ")}`);
        setLoading(false);
        return; // stop here — don't create the journal
    }
              // All emails are valid, safe to proceed
        const journalId = await createJournal(user.uid, name);

        for (const email of validEmails) {
            await inviteToJournal(journalId, email);
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