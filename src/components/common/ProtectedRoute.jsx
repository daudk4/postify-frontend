import { api } from "@/utils";
import React, { useEffect, useState } from "react";
import { Navigate } from "react-router";

export const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUserAuthenticated() {
      try {
        setLoading(true);
        const { status, data } = await api.get("/auth/check");
        if (status === 200) {
          setUser(data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    checkUserAuthenticated();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(user);

  if (!user?.userId) {
    return <Navigate to={"/signin"} />;
  }

  return <div>{children}</div>;
};
