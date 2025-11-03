import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type { login as LoginDto, StudentData } from "../types/auth";
import * as authApi from "../api/Students/authApi";

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
  ) => Promise<{ success: boolean; data?: StudentData; error?: string }>;
  logout: (clearAllData?: boolean) => Promise<void> | void;
  signup: (
    userData: Partial<StudentData>,
    userType: "student" | "company"
  ) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (payload: Partial<StudentData>) => Promise<any>;
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
        // Try to fetch profile from backend (cookie-based auth). If it succeeds,
        // populate user state and persist the profile locally so UI can restore quickly.
        const profile = await authApi.getProfile();
        // Only treat as authenticated if profile contains identifying fields
        if (profile && (profile.data)) {
          setUser(profile.data);
          setIsAuthenticated(true);
        }
      } catch (error) {
        // If backend profile fetch fails, treat as logged out
        console.info("No active session or failed to fetch profile:", error);
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; data?: StudentData; error?: string }> => {
    try {
      setIsLoading(true);
      const res = await authApi.login({ email, password } as LoginDto);
      const profile = res?.data;
      if (profile && (profile.id || profile.email)) {
        setUser(profile);
        setIsAuthenticated(true);
        return { success: true, data: profile };
      }

      // If profile is null it means the backend did not return/allow the cookie-based
      // session to be read immediately. Return an error so callers can handle it.
      return { success: false, error: "Failed to fetch profile after login" };
    } catch (err: any) {
      return { success: false, error: err?.message || "Login failed" };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (
    userData: Partial<StudentData>,
    userType: "student" | "company"
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      // Call backend signup
      await authApi.signUp(userData as StudentData);
      // Optionally auto-login: call login() using provided credentials if available
      void userType; // keep the parameter to match interface (not used client-side)
      if (userData.email && (userData as any).password) {
        return await login(userData.email, (userData as any).password);
      }
      return { success: true };
    } catch (err: any) {
      console.error("Signup error:", err);
      return {
        success: false,
        error: err?.message || "An error occurred during signup",
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async (_clearAllData = false) => {
    try {
      await authApi.logout();
    } catch (e) {
      console.info("logout request failed:", e);
    }

    // clearAllData is ignored when not using localStorage guest data
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (payload: Partial<StudentData>) => {
    try {
      const updated = await authApi.updateProfile(payload);
      if (updated) {
        setUser(updated.data || updated);
      }
      return updated;
    } catch (err: any) {
      throw err;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
    signup,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
