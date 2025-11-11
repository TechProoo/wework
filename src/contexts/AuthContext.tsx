import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import type {
  login as LoginDto,
  StudentData,
  CompanyData,
} from "../types/auth";
import * as studentAuthApi from "../api/Students/authApi";
import * as companyAuthApi from "../api/Companies/authApi";

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
    password: string,
    userType?: "student" | "company"
  ) => Promise<{ success: boolean; data?: any; error?: string }>;
  logout: (clearAllData?: boolean) => Promise<void> | void;
  signup: (
    userData: Partial<StudentData | CompanyData>,
    userType: "student" | "company"
  ) => Promise<{ success: boolean; error?: string }>;
  updateProfile: (payload: Partial<StudentData | CompanyData>) => Promise<any>;
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
        // Try to fetch profile from both APIs
        let profile: any = null;
        let detectedUserType: "student" | "company" | null = null;

        // Try company auth first
        try {
          const companyProfile = await companyAuthApi.getProfile();

          if (companyProfile && companyProfile.id) {
            profile = companyProfile;

            // Detect if it's a company by checking for company-specific fields
            if (companyProfile.companyName) {
              detectedUserType = "company";
            }
          }
        } catch (err) {
          // Company auth failed, will try student auth
        }

        // If no company profile, try student auth
        if (!profile) {
          try {
            const studentProfile = await studentAuthApi.getProfile();

            if (studentProfile && studentProfile.id) {
              profile = studentProfile;

              // Detect if it's a student by checking for student-specific fields
              if (studentProfile.firstName || studentProfile.lastName) {
                detectedUserType = "student";
              }
            }
          } catch (err) {
            // Student auth also failed
          }
        }

        // If we still don't have a userType but have a profile, try to detect from profile fields
        if (profile && profile.id && !detectedUserType) {
          // Check for company-specific fields
          if (profile.companyName) {
            detectedUserType = "company";
          }
          // Check for student-specific fields
          else if (
            profile.firstName ||
            profile.lastName ||
            profile.university
          ) {
            detectedUserType = "student";
          }
          // Default fallback
          else {
            detectedUserType = "student";
          }
        }

        if (profile && profile.id && detectedUserType) {
          const finalUser = { ...profile, userType: detectedUserType } as User;
          setUser(finalUser);
          setIsAuthenticated(true);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      } catch (error) {
        // If backend profile fetch fails, treat as logged out
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
    password: string,
    userType: "student" | "company" = "student"
  ): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      setIsLoading(true);

      // Use the appropriate API based on userType
      const authApi = userType === "company" ? companyAuthApi : studentAuthApi;

      // authApi.login now returns the user profile directly (no separate getProfile call)
      const profile = await authApi.login({ email, password } as LoginDto);

      if (profile && profile.id) {
        const finalUser = { ...profile, userType } as User;
        setUser(finalUser);
        setIsAuthenticated(true);
        return { success: true, data: { ...profile, userType } };
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
    userData: Partial<StudentData | CompanyData>,
    userType: "student" | "company"
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);

      // Use the appropriate API based on userType
      const authApi = userType === "company" ? companyAuthApi : studentAuthApi;

      // Call backend signup
      await authApi.signUp(userData as any);

      // Optionally auto-login if credentials are provided
      if (userData.email && (userData as any).password) {
        const loginResult = await login(
          userData.email,
          (userData as any).password,
          userType
        );
        return loginResult.success
          ? { success: true }
          : { success: false, error: loginResult.error };
      }

      return { success: true };
    } catch (err: any) {
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
      // Try to logout from both APIs (one will succeed, the other may fail silently)
      if (user?.userType === "company") {
        await companyAuthApi.logout();
      } else {
        await studentAuthApi.logout();
      }
    } catch (e) {
      console.info("logout request failed:", e);
    }

    setUser(null);
    setIsAuthenticated(false);
  };

  const updateProfile = async (payload: Partial<StudentData | CompanyData>) => {
    try {
      // Use the appropriate API based on current user type
      const authApi =
        user?.userType === "company" ? companyAuthApi : studentAuthApi;
      const updated = await authApi.updateProfile(payload as any);

      if (updated) {
        setUser({ ...updated, userType: user?.userType || "student" } as User);
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
