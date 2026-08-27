import { useState } from "react";
import { useAuth } from "./AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

function ProfileSetup({ onComplete }) {
    const { user } = useAuth();

    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const [saving, setSaving] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        const cleanUsername = username.trim().toLowerCase();


        if (cleanUsername.length < 3) {
            setError("Username must be at least 3 characters");
            return;
        } if (cleanUsername.length > 20) {
            setError("Username must be 20 characters or less.");
            return;
        } if (!/^[a-z0-9_]+$/.test(cleanUsername)) {
            setError(
                "Username can only contain lowercase letters, numbers, and underscores."
            );
            return;
        }

        setSaving(true);
        
        try {
            const usernameLower = cleanUsername.toLowerCase();

            const usernameRef = doc(db, "usernames", usernameLower);
            const usernameSnapshot = await getDoc(usernameRef);

            if (usernameSnapshot.exists()) {
                setError("That username is already taken.")
                setSaving(false);
                return;
            }

            await setDoc(usernameRef, {
                uid:user.uid,
            });

            await setDoc(
                doc(db, "users", user.uid),
                {
                    username: cleanUsername,
                },
                { merge: true }
            );
            console.log("Username created: ", cleanUsername)
            console.log("Profile created!");
            onComplete();
        } catch (error) {
            console.error(error);
            setError("Something went wrong. Please Try Again");
        }

        setSaving(false);
    };

      return (
    <div>
      <h1>Welcome to JournalBudgie! 🐦</h1>

      <p>Let's set up your profile.</p>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Choose a username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          maxLength={20}
        />

        <button type="submit" disabled={saving}>
          {saving ? "Saving..." : "Continue"}
        </button>
      </form>

      {error && <p>{error}</p>}
    </div>
  );
}

export default ProfileSetup;