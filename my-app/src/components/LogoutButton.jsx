import {useNavigate} from "react-router-dom";

 export default function LogoutButton()
{
  const navigate = useNavigate();

  const handleLogout = () =>
  {
    localStorage.removeItem("github_token");
    navigate("/");
  };
  return (
    <button
onClick ={handleLogout}
className="absolute top-4 right-4 px-4 py-2 bg-red-600 text-white rounded"

  >



      Logout
    </button>

  );



}