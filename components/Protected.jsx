import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../AuthContext"; // Adjust path if necessary

const Protected = () => {
  const { token, logout } = useContext(AuthContext);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL; // from .env

  useEffect(() => {
    const fetchProtected = async () => {
      if (!token) {
        navigate("/");
        return;
      }
      setIsLoading(true);
      try {
        const res = await fetch(`${API_URL}/protected`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setMessage(data.message);
        } else {
          setMessage(data.message || "Access denied");
        }
      } catch (err) {
        console.error(err);
        setMessage("Error accessing protected route");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProtected();
  }, [token, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-100 rounded-md mt-10 shadow-md">
      <h2 className="text-xl font-bold mb-4">Protected Page</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {message && <p className="mt-4 text-gray-700">{message}</p>}
          <button
            onClick={handleLogout}
            className="p-2 bg-red-500 text-white rounded mt-4"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default Protected;
