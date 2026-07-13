import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { getCurrentUser, loginUser, logoutUser } from "../api/authApi";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);      // null = logged out, object = logged in
  const [loading, setLoading] = useState(true); // true while checking cookie on first load

  const checkAuth = useCallback(async () => {
    try {
      const res = await getCurrentUser();
      setUser(res.user || null);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials) => {
    const res = await loginUser(credentials); // server sets httpOnly cookie
    setUser(res.user);
    return res;
  };

  const logout = async () => {
    try {
      await logoutUser(); // server clears the httpOnly cookie
    } finally {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}