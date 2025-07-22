import { useState } from "react";
import { useLocation } from "react-router-dom";
import Editor from "@monaco-editor/react";
import axios from "axios";

export default function Push() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const owner = params.get("owner");
  const repo = params.get("repo");
  
const[loading,setLoading] = useState(false);

const[pushingYourCode,setPushingYourCode] = useState(false);
const[pushingAICode,setPushingAICode] = useState(false);

  const [path, setPath] = useState("");
  const [content, setContent] = useState("// Start coding here...\n");
  const [aiContent, setAiContent] = useState(""); // NEW: improved code
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState("");

// ✅ Final handleUpgradeWithAI (calls backend safely)
const handleUpgradeWithAI = async () => {
  setLoading(true);

  try {
    const response = await axios.post(
      "http://localhost:4000/upgradeCode",
      { code: content }
    );

    console.log("AI response:", response.data.improvedCode);
    setAiContent(response.data.improvedCode);
  } catch (err) {
    console.error("AI upgrade failed:", err);
  } finally {
    setLoading(false);
  }
};





   

 const handlePushYourCode = async () => {
  const access_token = localStorage.getItem("github_token");
  setPushingYourCode(true);

  try {
    const response = await axios.post("http://localhost:4000/createFile", {
      access_token,
      owner,
      repo,
      path,
      content, // ✅ Directly use `content` here!
      message,
    });

    console.log("Push YOUR code success:", response.data);
    setSuccess(`✅ Your code pushed! Commit SHA: ${response.data.commit.sha}`);
  } catch (error) {
    console.error("Push YOUR code failed:", error);
    setSuccess("❌ Push YOUR code failed! Check console for details.");
  } finally {
    setPushingYourCode(false);
  }
};


  const handlePushAICode = async () => {
  const access_token = localStorage.getItem("github_token");
  setPushingAICode(true);

  try {
    const response = await axios.post("http://localhost:4000/createFile", {
      access_token,
      owner,
      repo,
      path,
      content: aiContent, // ✅ Directly use `aiContent` here!
      message,
    });

    console.log("Push AI code success:", response.data);
    setSuccess(`✅ AI code pushed! Commit SHA: ${response.data.commit.sha}`);
  } catch (error) {
    console.error("Push AI code failed:", error);
    setSuccess("❌ Push AI code failed! Check console for details.");
  } finally {
    setPushingAICode(false);
  }
};


  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">
          Push Code to <span className="text-green-400">{repo}</span>
        </h1>

        <input
          type="text"
          placeholder="File path (e.g. index.js)"
          value={path}
          onChange={(e) => setPath(e.target.value)}
          className="w-full px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none"
        />

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h2 className="font-bold mb-2">📝 Your Code</h2>
            <Editor
              height="300px"
              theme="vs-dark"
              defaultLanguage="javascript"
              value={content}
              onChange={(value) => setContent(value)}
            />
          </div>

          <div>
            <h2 className="font-bold mb-2">🤖 AI Improved Code</h2>
            <Editor
              height="300px"
              theme="vs-dark"
              defaultLanguage="javascript"
              value={aiContent}
              onChange={(value) => setAiContent(value)}
            />
              {loading && (
    <div className="flex items-center gap-2 mt-2">
      <div className="w-4 h-4 border-2 border-t-2 border-t-transparent border-white rounded-full animate-spin"></div>
      <p>Generating AI code...</p>
    </div>
  )}




          </div>
        </div>

        <div className="flex gap-4 flex-wrap">
          <button
            onClick={handleUpgradeWithAI}
            className="px-6 py-3 bg-blue-600 rounded hover:bg-blue-700 transition"
          >
            ⚡ Upgrade with AI
          </button>

          <input
            type="text"
            placeholder="Commit message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="flex-1 px-4 py-2 rounded bg-gray-800 text-white placeholder-gray-400 border border-gray-700 focus:outline-none"
          />

  <button
  onClick={handlePushYourCode}
  disabled={pushingYourCode}
  className={`px-6 py-3 rounded transition ${
    pushingYourCode ? 'bg-green-400 cursor-not-allowed' : 'bg-green-600 hover:bg-green-700'
  }`}
>
  {pushingYourCode ? 'Pushing...' : '🚀 Push *Your* Code'}
</button>

<button
  onClick={handlePushAICode}
  disabled={pushingAICode}
  className={`px-6 py-3 rounded transition ${
    pushingAICode ? 'bg-purple-400 cursor-not-allowed' : 'bg-purple-600 hover:bg-purple-700'
  }`}
>
  {pushingAICode ? 'Pushing...' : '🤖 Push *AI* Code'}
</button>




        </div>

        {success && <p className="text-green-400">{success}</p>}
      </div>
    </div>
  );
}
