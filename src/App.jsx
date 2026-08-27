import { app, db } from './firebase';
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import ProfileSetup from "./ProfileSetup";
import { Login } from "./Login";
import { logOut } from "./auth"
import { useAuth } from "./AuthContext";
import Dashboard from "./Dashboard";
import CreateJournal from "./CreateJournal";
import MyJournals from "./MyJournals";

function App() {

  const { user, loading } = useAuth();

  const [profileLoading, setProfileLoading] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    const checkProfile = async () => {
      if (!user) {
        setHasProfile(false);
        setProfileLoading(false);
        return;
      }
      try {
        const profileRef = doc(db, "users", user.uid);
        const profileSnapshot = await getDoc(profileRef);

        setHasProfile(
          profileSnapshot.exists() &&
          Boolean(profileSnapshot.data().username)
        );
      } catch (error) {
        console.error(error);
      }

      setProfileLoading(false);
    };
    checkProfile();
  }, [user]);
  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Login />;
  }
    if (!hasProfile) {
    return <ProfileSetup onComplete={() => setHasProfile(true)}/>;
  }

  return (
    <>
    <Dashboard />
    <CreateJournal />
    </>
  );
}

export default App;