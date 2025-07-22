import { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";

export default function Repos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("github_token");
    if (!token) {
      console.log("No GitHub token found.");
      return;
    }

    const fetchRepos = async () => {
      try {
        const response = await axios.get("https://api.github.com/user/repos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setRepos(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching repos:", error);
      }
    };

    fetchRepos();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <h1 className="text-white text-2xl font-bold">Loading repositories...</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white py-12 px-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 border-b border-gray-700 pb-2">
          Your GitHub Repositories
        </h1>
        <button
          onClick={() => window.location.reload()}
          className="mb-8 px-5 py-2 bg-green-600 hover:bg-green-700 transition rounded"
        >
          🔄 Refresh Repos
        </button>

        <div className="space-y-6">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="bg-gray-800 border border-gray-700 rounded-lg p-6 shadow hover:shadow-lg transition"
            >
              <h2 className="text-2xl font-semibold">{repo.name}</h2>
              <p className="text-gray-400 mt-1">
                {repo.description || "No description provided."}
              </p>
       <Link
  to={`/push?owner=${repo.owner.login}&repo=${repo.name}`}
  className="inline-block mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 rounded text-white font-semibold transition"
>
  🚀 Push Code
</Link>



             
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


