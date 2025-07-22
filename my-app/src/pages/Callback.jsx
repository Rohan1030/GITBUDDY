import { useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Callback() {
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get("code");

    console.log("Github code:", code);

    if (!code) {
      console.error("No code found! Redirecting to login...");
      navigate("/");
      return;
    }

    const getAccessToken = async () => {
      try {
        const response = await axios.post("http://localhost:4000/getAccessToken", {
          code: code,
        });

        console.log("GitHub response:", response.data);

        const token = response.data.access_token;

        if (!token) {
          console.error("Access token missing — maybe bad code?");
          localStorage.removeItem("github_token");
          navigate("/");
          return;
        }

        localStorage.setItem("github_token", token);
        navigate("/profile");

      } catch (error) {
        console.error("Error getting access token:", error);
        localStorage.removeItem("github_token");
        navigate("/");
      }
    };

    getAccessToken();
  }, [navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-2xl font-bold">Handling GitHub OAuth...</h1>
    </div>
  );
}
