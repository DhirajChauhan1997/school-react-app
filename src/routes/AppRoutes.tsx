import React from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import { AuthProvider, useAuth } from "../context/AuthContext";
import ChildDashboard from "../pages/child/ChildDashboard";
import ClassTeacherDashboard from "../pages/classTeacher/ClassTeacherDashboard";
import LoginPage from "../pages/Login";
import PrincipalDashboard from "../pages/principal/PrincipalDashboard";
import ProtectedRoute from "./ProtectedRoute";
import { ROUTES } from "./Route";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  return user ? <>{children}</> : <Navigate to={ROUTES.LOGIN} replace />;
};

const AppRoutes: React.FC = () => {
  // const navigate = useNavigate();

  // // Check localStorage on component mount
  // useEffect(() => {
  //   const token = localStorage.getItem("userToken");
  //   if (token) {
  //     navigate(ROUTES.DASHBOARD, { replace: true }); // Redirect to dashboard if token exists
  //   }
  // }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path={ROUTES.LOGIN} element={<LoginPage />} />
          {/* Protected Route */}
          <Route element={<ProtectedRoute allowedRoles={["PRINCIPAL"]} />}>
            <Route
              path={ROUTES.PRINCIPAL_DASHBOARD}
              element={<PrincipalDashboard />}
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["TEACHER"]} />}>
            <Route
              path={ROUTES.CLASS_TEACHER_DASHBOARD}
              element={<ClassTeacherDashboard />}
            />
          </Route>
          <Route element={<ProtectedRoute allowedRoles={["CHILD"]} />}>
            <Route path={ROUTES.DASHBOARD} element={<ChildDashboard />} />
          </Route>

          <Route path="*" element={<Navigate to={ROUTES.LOGIN} replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default AppRoutes;
