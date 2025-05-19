import { api } from "@/utils";

export const setAuthToken = (token) => {
  if (token) {
    localStorage.setItem("accessToken", token);
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    localStorage.removeItem("accessToken");
    delete api.defaults.headers.common["Authorization"];
  }
};

export const getAuthToken = () => {
  return localStorage.getItem("accessToken");
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("accessToken");
};
