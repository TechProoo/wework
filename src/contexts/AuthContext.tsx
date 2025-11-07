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
        // Try to fetch profile from backend (cookie-based auth)
        const profile = await authApi.getProfile();

        if (profile && profile.id) {
          setUser(profile as User);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        // If backend profile fetch fails, treat as logged out
        console.info(
          "[AuthContext] checkAuthStatus: failed to fetch profile",
          error
        );
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
      console.log("[AuthContext] login: starting login for", email);

      // authApi.login now returns the user profile directly (no separate getProfile call)
      const profile = await authApi.login({ email, password } as LoginDto);

      console.log("[AuthContext] login: received profile from login response");

      if (profile && profile.id) {
        setUser(profile as User);
        setIsAuthenticated(true);
        console.log("[AuthContext] login: user authenticated successfully");
        return { success: true, data: profile };
      }

      // Handle unexpected empty response
      console.error("[AuthContext] login: no valid profile in response");
      return { success: false, error: "Failed to fetch profile after login." };
    } catch (err: any) {
      console.error("[AuthContext] login: error", err);
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

      // Optionally auto-login if credentials are provided
      void userType; // keep the parameter to match interface
      if (userData.email && (userData as any).password) {
        const loginResult = await login(
          userData.email,
          (userData as any).password
        );
        return loginResult.success
          ? { success: true }
          : { success: false, error: loginResult.error };
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

    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (payload: Partial<StudentData>) => {
    try {
      const updated = await authApi.updateProfile(payload);

      if (updated) {
        setUser(updated as User);
      }

      return updated;
    } catch (err: any) {
      console.error("[AuthContext] updateProfile: failed", err);
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
