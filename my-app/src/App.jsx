import {BrowserRouter , Routes , Route} from 'react-router-dom';
import Login from "./pages/login";
import Callback from "./pages/Callback";
import Profile from './pages/Profile';
import Repos from './pages/Repo';
import Push from "./pages/Push.jsx";
import logoutButton from './components/LogoutButton.jsx';


export default function App() {
  return (
   <BrowserRouter>
   <div
   className="relative"
   >
    {isLoggedIn && <logoutButton/>}
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
