import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AuthLoader from "./AuthLoader";

interface PublicOnlyRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export const PublicOnlyRoute: React.FC<PublicOnlyRouteProps> = ({
  children,
  redirectTo,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  // Show loading screen while checking authentication
  if (isLoading) {
    return <AuthLoader />;
  }

  // If authenticated, redirect to appropriate dashboard based on user type
  if (isAuthenticated) {
    // Use provided redirectTo, or determine based on user type
    const finalRedirect =
      redirectTo ||
      (user?.userType === "company" ? "/company/dashboard" : "/dashboard");
    return <Navigate to={finalRedirect} replace />;
  }

  return <>{children}</>;
};

export default PublicOnlyRoute;
