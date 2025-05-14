import React from "react";
import Profile from "@/components/profile";
import SignupForm from "@/components/auth/SignupForm";
import SignInForm from "@/components/auth/SignInForm";
import { createBrowserRouter, RouterProvider } from "react-router";
import { ProtectedRoute } from "@/components/common/ProtectedRoute";

const router = createBrowserRouter([
  // {
  //   path: "/",
  //   children: [
  //     {
  //       index: true,
  //       Component: SignupForm,
  //     },
  //     {
  //       path: "signin",
  //       Component: SignInForm,
  //     },
  //     {
  //       path:'/dashboard'
  //     }
  //   ],
  // },
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
  return <RouterProvider router={router} />;
}
