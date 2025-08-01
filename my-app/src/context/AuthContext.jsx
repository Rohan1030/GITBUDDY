import { createContext, useContext, useState, useEffect } from "react";

// 1. Create the context
const AuthContext = createContext();

// 2. Create the provider component
export function AuthProvider({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("github_token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const login = (token) => {
    localStorage.setItem("github_token", token);
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem("github_token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 3. Create the custom hook
export function useAuth() {
  return useContext(AuthContext);
}
