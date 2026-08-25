import { useState } from "react";
import { logIn, signUp } from "./auth";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

        try {
            if (isCreatingAccount) {
                await signUp(email, password);
            } else {
                await logIn(email, password);
            }
        } catch (error) {
            setError(error.message);
        }
  };

  return (
    <div>
        <h1>
            {isCreatingAccount ? "Create Account!" : "Welcome Back!"}
        </h1>

        <form onSubmit={handleSubmit}>
            <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
         <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

         <button type="submit">
          {isCreatingAccount ? "Sign Up" : "Log In"}
        </button>
        </form>

        {error && <p>{error}</p>}
      <button
        onClick={() => setIsCreatingAccount(!isCreatingAccount)}
      >
        {isCreatingAccount
          ? "Already have an account?"
          : "Create an account"}
      </button>
    </div>
  );
}

export default Login;

