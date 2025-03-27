// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import { ROUTES } from "./Route";

// const ProtectedRoute: React.FC = () => {
//   const { isAuthenticated } = useAuth();
//   return isAuthenticated ? <Outlet /> : <Navigate to={ROUTES.LOGIN} replace />;
// };

// export default ProtectedRoute;

import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { ROUTES } from "./Route";

const ProtectedRoute = ({ allowedRoles }: { allowedRoles: string[] }) => {
  const { user } = useContext(AuthContext)!;

  return user && allowedRoles.includes(user.role) ? (
    <Outlet />
  ) : (
    <Navigate to={ROUTES.LOGIN} />
  );
};

export default ProtectedRoute;
