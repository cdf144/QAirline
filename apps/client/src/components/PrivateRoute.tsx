import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface PrivateRouteProps {
  children: React.ReactNode;
  requiredRoles?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  requiredRoles = [],
}) => {
  const { isAuthenticated, roles } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (
    requiredRoles.length > 0 &&
    !requiredRoles.some((role) => roles.includes(role))
  ) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
