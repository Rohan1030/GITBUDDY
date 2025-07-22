import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("github_token");

    if (!token) {
      navigate("/");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await axios.get("https://api.github.com/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        localStorage.removeItem("github_token");
        navigate("/");
      }
    };

    fetchUser();
  }, [navigate]);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <h1 className="text-2xl font-bold text-white">Loading profile...</h1>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full flex flex-col items-center text-center">
        <img
          src={user.avatar_url}
          alt="Avatar"
          className="w-32 h-32 rounded-full border-4 border-gray-200"
        />
        <h1 className="text-3xl font-bold mt-4">{user.name || user.login}</h1>
        <p className="text-gray-600">@{user.login}</p>
        {user.bio && <p className="text-gray-500 mt-2">{user.bio}</p>}

        <div className="flex flex-col space-y-3 mt-6 w-full">
          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="w-full inline-block bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            🔗 View GitHub Profile
          </a>

          <Link
            to="/repos"
            className="w-full inline-block border border-black text-black py-2 rounded hover:bg-gray-100 transition"
          >
            📂 View Your Repositories
          </Link>
        </div>
      </div>
    </div>
  );
}
