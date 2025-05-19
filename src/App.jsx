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
import OtpVerificationForm from "./components/auth/OtpVerificationForm";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    children: [
      {
        index: true,
        element: <Profile />,
      },
    ],
  },
  {
    path: "/signup",
    element: <SignupForm />,
  },
  {
    path: "/verify-account",
    element: <OtpVerificationForm />,
  },
  {
    path: "/signin",
    element: <SignInForm />,
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
      <ToastContainer
        className="m-4 w-[200px] md:m-0 w-full"
        position="bottom-left"
        autoClose={3000}
        closeOnClick
        pauseOnHover={false}
        pauseOnFocusLoss={false}
        draggable={false}
        style={{ padding: "8px" }}
      />
    </>
  );
}
