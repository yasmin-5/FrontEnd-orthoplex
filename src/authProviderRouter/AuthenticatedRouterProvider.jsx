import React from "react";
import { RouterProvider } from "react-router-dom";
import AuthProvider from "../Authcontext/AuthProvider"; // Ensure AuthProvider is correctly imported

const AuthenticatedRouterProvider = ({ children, router }) => {
  return (
    <AuthProvider>
      <RouterProvider router={router}>{children}</RouterProvider>
    </AuthProvider>
  );
};

export default AuthenticatedRouterProvider;
