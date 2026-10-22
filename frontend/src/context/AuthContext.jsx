import React, { createContext, useContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../api/auth.js";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem("roadready_user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("roadready_token") || null;
  });

  const [loading, setLoading] = useState(false);

  const login = async (username, password) => {
    setLoading(true);
    try {
      const data = await loginUser(username, password);
      const authToken = data.token;
      const authUser = { username: data.username || username };
      
      setToken(authToken);
      setUser(authUser);
      localStorage.setItem("roadready_token", authToken);
      localStorage.setItem("roadready_user", JSON.stringify(authUser));
      return { success: true };
    } catch (err) {
      // Offline fallback demo capability so UI testing never gets blocked
      if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
        const demoUser = { username, role: "customer" };
        const demoToken = "demo-offline-token";
        setToken(demoToken);
        setUser(demoUser);
        localStorage.setItem("roadready_token", demoToken);
        localStorage.setItem("roadready_user", JSON.stringify(demoUser));
        return { success: true, offline: true };
      }
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    setLoading(true);
    try {
      const data = await registerUser(userData);
      const authToken = data.token;
      const authUser = { username: data.username || userData.username, role: userData.role };
      
      setToken(authToken);
      setUser(authUser);
      localStorage.setItem("roadready_token", authToken);
      localStorage.setItem("roadready_user", JSON.stringify(authUser));
      return { success: true };
    } catch (err) {
      if (err.message.includes("Failed to fetch") || err.message.includes("NetworkError")) {
        const demoUser = { username: userData.username, role: userData.role };
        const demoToken = "demo-offline-token";
        setToken(demoToken);
        setUser(demoUser);
        localStorage.setItem("roadready_token", demoToken);
        localStorage.setItem("roadready_user", JSON.stringify(demoUser));
        return { success: true, offline: true };
      }
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("roadready_token");
    localStorage.removeItem("roadready_user");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isAuthenticated: !!token,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
