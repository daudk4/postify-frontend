/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useState, useContext, useEffect } from "react";
import { api, setAuthToken } from "@/utils"; // Adjust path as needed

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("Using auth context outside the auth provider");
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [initialized, setInitialized] = useState(false);

  const updateUser = async () => {
    try {
      const response = await api.get("/getUser");
      if (response.status === 200 && response.data) {
        setCurrentUser(response.data);
      }
    } catch (error) {
      if (!error.expired) {
        logout();
      }
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");

        if (token) {
          setAuthToken(token);
          await updateUser();
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setInitialized(true);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await api.post("/signin", { email, password });

      if (response.status === 200 && response.data) {
        setAuthToken(response.data);

        const userResponse = await api.get("/getUser");
        if (userResponse.status === 200) {
          setCurrentUser(userResponse.data);
        }

        return { success: true };
      }
    } catch (error) {
      return {
        success: false,
        message:
          error.message || "Login failed. Please check your credentials.",
      };
    }
  };

  const logout = async () => {
    try {
      await api.get("/logout");
    } catch (error) {
      console.log(error, "error in logout");
    } finally {
      setAuthToken(null);
      setCurrentUser(null);
    }
  };

  const value = {
    currentUser,
    loading,
    initialized,
    login,
    logout,
    updateUser,
    isAuthenticated: !!currentUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
