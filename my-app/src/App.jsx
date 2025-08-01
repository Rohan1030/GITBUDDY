import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Login from "./pages/login";
import Callback from "./pages/Callback";
import Profile from './pages/Profile';
import Repos from './pages/Repo';
import Push from "./pages/Push.jsx";
import LogoutButton from './components/LogoutButton';
import { useAuth } from './context/AuthContext';

// Wrapper component to conditionally show LogoutButton
function LayoutWithLogout({ children }) {
  const { isLoggedIn } = useAuth();
  const location = useLocation();

  // Don't show logout on login or callback page
  const hideLogout = location.pathname === '/' || location.pathname === '/callback';

  return (
    <div className="relative">
      {isLoggedIn && !hideLogout && <LogoutButton />}
      {children}
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LayoutWithLogout>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/callback" element={<Callback />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/repos" element={<Repos />} />
          <Route path="/push" element={<Push />} />
        </Routes>
      </LayoutWithLogout>
    </BrowserRouter>
  );
}
