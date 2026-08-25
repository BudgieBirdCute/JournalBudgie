import { app } from './firebase';
import { Login } from "./Login";
import { logOut } from "./auth"
import { useAuth } from "./AuthContext";

function App() {

  const { user, loading } = useAuth();

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (!user) {
    return <Login />;
  }

  return (
    <div>
      <h1>Welcome to JournalBudgie 🐦</h1>

      <p>Logged in as: {user.email}</p>
      <button onClick={logOut}>
        LOG OUT
      </button>
    </div>
  );
}

export default App;