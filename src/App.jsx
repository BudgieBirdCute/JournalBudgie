import { app } from './firebase';
import { Login } from "./Login";
import { logOut } from "./auth"
import { useAuth } from "./AuthContext";
import Dashboard from "./Dashboard";
import CreateJournal from "./CreateJournal";
import MyJournals from "./MyJournals";

function App() {

  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <>
    <Dashboard />
    <CreateJournal />
    </>
  );
}

export default App;