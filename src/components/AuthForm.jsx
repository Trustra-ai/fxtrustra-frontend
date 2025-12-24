import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../AuthContext"; // Adjust path if necessary

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL; // from .env

  // Handle Register
  const handleRegister = async () => {
    setIsRegistering(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        setMessage(data.message);
      } else {
        setMessage(data.message || "Error registering user");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error registering user");
    } finally {
      setIsRegistering(false);
    }
  };

  // Handle Login
  const handleLogin = async () => {
    setIsLoggingIn(true);
    setMessage("");
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();
      if (res.ok) {
        login(data.token);
        setMessage("Login successful!");
        navigate("/protected");
      } else {
        setMessage(data.message || "Error logging in");
      }
    } catch (err) {
      console.error(err);
      setMessage("Error logging in");
    } finally {
      setIsLoggingIn(false);
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100 rounded-md mt-10 shadow-md">
      <h2 className="text-xl font-bold mb-4">Auth Form</h2>
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="w-full p-2 mb-2 border rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 mb-4 border rounded"
      />
      <div className="flex gap-2">
        <button 
          onClick={handleRegister} 
          disabled={isRegistering} 
          className={`p-2 bg-blue-500 text-white rounded ${isRegistering ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isRegistering ? "Registering..." : "Register"}
        </button>
        <button 
          onClick={handleLogin} 
          disabled={isLoggingIn} 
          className={`p-2 bg-green-500 text-white rounded ${isLoggingIn ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
      </div>
      {message && <p className="mt-4 text-gray-700">{message}</p>}
    </div>
  );
};

export default AuthForm;
