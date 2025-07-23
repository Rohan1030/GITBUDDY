import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from "./pages/login";
import Callback from "./pages/Callback";
import Profile from './pages/Profile';
import Repos from './pages/Repo';
import Push from "./pages/Push.jsx";
import LogoutButton from './components/LogoutButton';


export default function App() {
   const isLoggedIn = !!localStorage.getItem("github_token");
  
  return (
   <BrowserRouter>
   <div
   className="relative"
   >
    {isLoggedIn && <LogoutButton/>}
   <Routes> 
    <Route path="/" element={<Login/>}  />
    <Route path="/callback" element ={<Callback/>} />
     <Route path="/profile" element={<Profile />} />
     <Route path="/repos" element={<Repos/>}/>
     <Route path="/push" element={<Push />} />


   </Routes>
   </div>
   </BrowserRouter>
  );
}
