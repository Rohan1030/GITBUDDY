export default function Login() {
  const CLIENT_ID = "Ov23lioeX2eurSZxd3f6";

  const handleLogin = () => {
    window.location.assign(
      `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=repo`
    );
  };

return (
  <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-black to-green-600 text-center px-4">
    <h1 className="text-5xl font-extrabold text-white mb-12 drop-shadow-lg">
      Welcome to <span className="text-green-400">GitBuddy</span>
    </h1>

    <button
      onClick={handleLogin}
      className="bg-white text-black w-40 h-40 rounded-full flex flex-col items-center justify-center shadow-2xl hover:bg-gray-200 transition duration-300 overflow-hidden"
    >
      <div className="w-20 h-20">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-full h-full"
        >
          <path d="M12 .5a12 12 0 00-3.79 23.4c.6.1.82-.26.82-.58v-2.1c-3.34.7-4-1.6-4-1.6a3.16 3.16 0 00-1.33-1.75c-1.1-.7.1-.7.1-.7a2.51 2.51 0 011.82 1.23 2.6 2.6 0 003.54 1 2.61 2.61 0 01.78-1.65c-2.67-.3-5.47-1.34-5.47-5.9a4.6 4.6 0 011.22-3.17 4.28 4.28 0 01.1-3.13s1-.3 3.3 1.2a11.3 11.3 0 016 0c2.3-1.5 3.3-1.2 3.3-1.2a4.28 4.28 0 01.1 3.13 4.6 4.6 0 011.22 3.17c0 4.6-2.8 5.6-5.47 5.9a3 3 0 01.86 2.33v3.46c0 .32.22.7.82.58A12 12 0 0012 .5z" />
        </svg>
      </div>
      <span className="font-semibold text-sm mt-2">Login with GitHub</span>
    </button>
  </div>
);

}
