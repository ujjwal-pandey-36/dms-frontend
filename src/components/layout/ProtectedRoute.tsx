import { useAuth } from "@/contexts/AuthContext";
import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  // Store the attempted URL
  useEffect(() => {
    if (!isAuthenticated) {
      sessionStorage.setItem("redirectUrl", location.pathname);
    }
  }, [isAuthenticated, location]);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};
