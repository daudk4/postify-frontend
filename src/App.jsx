import React from "react";
//routes-imports:
import Profile from "@/components/profile";
import SignupForm from "@/components/auth/SignupForm";
import SignInForm from "@/components/auth/SignInForm";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";
//toastify-imports:
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
//react-router-imports:
import { createBrowserRouter, RouterProvider } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "signup",
        Component: SignupForm,
      },
      {
        path: "signin",
        Component: SignInForm,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
      />
    </>
  );
}
