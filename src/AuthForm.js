import { useState } from "react";
import { registerUser, loginUser } from "./api";

export default function AuthForm() {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let result;
      if (isRegister) {
        result = await registerUser(username, password);
      } else {
        result = await loginUser(username, password);
      }
      setMessage(JSON.stringify(result));
    } catch (err) {
      setMessage("Error connecting to backend");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "2rem" }}>
      <h2>FxTrustra {isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: "100%", margin: "0.5rem 0" }}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: "100%", margin: "0.5rem 0" }}
          />
        </div>
        <button type="submit">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>
      <p style={{ marginTop: "1rem" }}>
        {isRegister ? "Already have an account?" : "No account?"}{" "}
        <span
          onClick={() => setIsRegister(!isRegister)}
          style={{ color: "blue", cursor: "pointer" }}
        >
          {isRegister ? "Login" : "Register"}
        </span>
      </p>
      {message && (
        <div style={{ marginTop: "1rem", background: "#f1f1f1", padding: "1rem" }}>
          {message}
        </div>
      )}
    </div>
  );
}
