import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { AuthLoader } from "../Components/AuthLoader";

interface CompanyProtectedRouteProps {
  children: React.ReactNode;
}

export const CompanyProtectedRoute: React.FC<CompanyProtectedRouteProps> = ({
  children,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  console.log("[CompanyProtectedRoute] auth state", {
    isAuthenticated,
    isLoading,
    user,
  });

  if (isLoading) {
    return <AuthLoader />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/company/login" replace />;
  }

  // Check if user is actually a company
  if (user?.userType !== "company") {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};
