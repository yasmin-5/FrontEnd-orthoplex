import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../Authcontext/AuthProvider";  // Assuming you're using context for auth

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth(); // Access your authentication status here

  if (!isAuthenticated) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return children; // Render the protected route if authenticated
};

export default ProtectedRoute;
