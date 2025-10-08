import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface User {
  id: string;
  email: string;
  userType: "student" | "company";
  firstName?: string;
  lastName?: string;
  companyName?: string;
  contactPersonName?: string;
  phone?: string;
  dateOfBirth?: string;
  country?: string;
  city?: string;
  education?: string;
  interests?: string[];
  website?: string;
  industry?: string;
  companySize?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: (clearAllData?: boolean) => void;
  signup: (
    userData: any,
    userType: "student" | "company"
  ) => Promise<{ success: boolean; error?: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const storedUser = localStorage.getItem("wework_user");
        const storedToken = localStorage.getItem("wework_token");

        if (storedUser && storedToken) {
          const userData = JSON.parse(storedUser);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error parsing stored user data:", error);
        localStorage.removeItem("wework_user");
        localStorage.removeItem("wework_token");
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Get stored users from localStorage
      const storedUsers = localStorage.getItem("wework_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Find user with matching email and password
      const foundUser = users.find(
        (u: any) => u.email === email && u.password === password
      );

      if (!foundUser) {
        return { success: false, error: "Invalid email or password" };
      }

      // Create user session
      const userSession = {
        id: foundUser.id,
        email: foundUser.email,
        userType: foundUser.userType,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        companyName: foundUser.companyName,
        contactPersonName: foundUser.contactPersonName,
      };

      // Store session
      localStorage.setItem("wework_user", JSON.stringify(userSession));
      localStorage.setItem("wework_token", "mock_jwt_token_" + Date.now());

      setUser(userSession);
      setIsAuthenticated(true);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, error: "An error occurred during login" };
    }
  };

  const signup = async (
    userData: any,
    userType: "student" | "company"
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      // Get existing users
      const storedUsers = localStorage.getItem("wework_users");
      const users = storedUsers ? JSON.parse(storedUsers) : [];

      // Check if email already exists
      const existingUser = users.find((u: any) => u.email === userData.email);
      if (existingUser) {
        return { success: false, error: "Email already registered" };
      }

      // Create new user
      const newUser = {
        id:
          "user_" + Date.now() + "_" + Math.random().toString(36).substr(2, 9),
        email: userData.email,
        password: userData.password,
        userType,
        createdAt: new Date().toISOString(),
        ...userData,
      };

      // Add to users array
      users.push(newUser);
      localStorage.setItem("wework_users", JSON.stringify(users));

      // Auto-login after signup
      const loginResult = await login(userData.email, userData.password);

      return loginResult;
    } catch (error) {
      console.error("Signup error:", error);
      return { success: false, error: "An error occurred during signup" };
    }
  };

  const logout = (clearAllData = false) => {
    // Always remove current session
    localStorage.removeItem("wework_user");
    localStorage.removeItem("wework_token");

    // If clearAllData is true, remove all stored user data
    if (clearAllData) {
      localStorage.removeItem("wework_users");
      console.log("All user data cleared from localStorage");
    }

    setUser(null);
    setIsAuthenticated(false);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    signup,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
