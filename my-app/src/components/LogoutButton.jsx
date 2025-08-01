// src/components/LogoutButton.jsx
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function LogoutButton() {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("github_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("github_token");
    setIsLoggedIn(false);
    navigate("/");
  };

  if (!isLoggedIn) return null;

  return (
    <button
      onClick={handleLogout}
      className="fixed top-4 right-4 px-4 py-2 bg-red-600 text-white rounded z-50"
    >
      Logout
    </button>
  );
}
