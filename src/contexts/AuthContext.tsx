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
        console.log("[AuthContext] checkAuthStatus: starting");
        // Try to fetch profile from backend (cookie-based auth). If it succeeds,
        // populate user state and persist the profile locally so UI can restore quickly.
        const profile = await authApi.getProfile();
        console.log("[AuthContext] checkAuthStatus: profile response", profile);
        // Only treat as authenticated if profile contains identifying fields
        if (profile && profile.data) {
          setUser(profile.data);
          console.log(
            "[AuthContext] checkAuthStatus: authenticated user set",
            profile.data
          );
          setIsAuthenticated(true);
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

      console.log("[AuthContext] login: calling authApi.login for", email);
      // Call backend login
      const res = await authApi.login({ email, password } as LoginDto);
      console.log("[AuthContext] login: authApi.login result", res);

      // authApi.login returns { data: profileResponse, message }
      // profileResponse is the axios response from getProfile, so drill safely
      const profile =
        res?.data?.data?.data ?? res?.data?.data ?? res?.data ?? null;
      console.log("[AuthContext] login: extracted profile", profile);

      if (profile) {
        setUser(profile);
        console.log("[AuthContext] login: authenticated user set", profile);
        setIsAuthenticated(true);
        return { success: true, data: profile };
      }

      // Handle unexpected empty response
      return { success: false, error: "Failed to fetch profile after login." };
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
      console.log(
        "[AuthContext] signup: calling authApi.signUp",
        userData?.email
      );
      // Call backend signup
      await authApi.signUp(userData as StudentData);
      console.log(
        "[AuthContext] signup: signUp returned, attempting auto-login if credentials provided"
      );
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
      console.log("[AuthContext] logout: calling authApi.logout");
      await authApi.logout();
      console.log("[AuthContext] logout: authApi.logout completed");
    } catch (e) {
      console.info("logout request failed:", e);
    }

    // clearAllData is ignored when not using localStorage guest data
    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (payload: Partial<StudentData>) => {
    console.log(
      "[AuthContext] updateProfile: calling authApi.updateProfile",
      payload
    );
    try {
      const updated = await authApi.updateProfile(payload);
      console.log("[AuthContext] updateProfile: response", updated);
      if (updated) {
        setUser(updated.data || updated);
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
