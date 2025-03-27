import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import User from "../core/model/user/User";
import { APP_JWT_TOCKEN_KEY, APP_USER_KEY } from "../utils/Constants";

interface AuthContextType {
  user: User | null;
  login: (user: User) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const navigate = useNavigate();

  // Check localStorage on component mount
  useEffect(() => {
    const token = localStorage.getItem(APP_JWT_TOCKEN_KEY);
    if (token) {
      setIsAuthenticated(true);
      // navigate(ROUTES.DASHBOARD, { replace: true }); // Redirect to dashboard if token exists
    }
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem(APP_JWT_TOCKEN_KEY) // Check localStorage for auth
  );
  const [user, setUser] = useState<any | null>(null);

  const login = (user: User) => {
    setUser(user);
    localStorage.setItem(APP_USER_KEY, JSON.stringify(user));
    localStorage.setItem(APP_JWT_TOCKEN_KEY, user.jwtToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(APP_USER_KEY);
    localStorage.removeItem(APP_JWT_TOCKEN_KEY);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
