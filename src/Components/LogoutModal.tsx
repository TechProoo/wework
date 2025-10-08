import { useState } from "react";
import { AlertTriangle, X, LogOut, Trash2 } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface LogoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LogoutModal: React.FC<LogoutModalProps> = ({
  isOpen,
  onClose,
}) => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = async (clearAllData = false) => {
    setIsLoggingOut(true);

    // Small delay for better UX
    await new Promise((resolve) => setTimeout(resolve, 500));

    logout(clearAllData);
    onClose();
    navigate("/");
    setIsLoggingOut(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl">
              <LogOut size={20} className="text-white" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text)]">
              Logout Options
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-xl transition-colors"
          >
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* User Info */}
        <div className="bg-[var(--color-light)] rounded-xl p-4 mb-6">
          <p className="text-sm text-gray-600 mb-1">Signed in as</p>
          <p className="font-medium text-[var(--color-text)]">
            {user?.userType === "company"
              ? user.companyName
              : `${user?.firstName || ""} ${user?.lastName || ""}`.trim() ||
                user?.email}
          </p>
          <p className="text-sm text-gray-500">{user?.email}</p>
          <div className="mt-2">
            <span
              className={`px-2 py-1 text-xs font-medium rounded-full ${
                user?.userType === "company"
                  ? "bg-[var(--color-accent)]/20 text-[var(--color-accent)]"
                  : "bg-[var(--color-primary)]/20 text-[var(--color-primary)]"
              }`}
            >
              {user?.userType === "company"
                ? "Company Account"
                : "Student Account"}
            </span>
          </div>
        </div>

        {/* Logout Options */}
        <div className="space-y-3">
          {/* Regular Logout */}
          <button
            onClick={() => handleLogout(false)}
            disabled={isLoggingOut}
            className="w-full p-4 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <LogOut size={18} />
            {isLoggingOut ? "Logging out..." : "Logout (Keep Data)"}
          </button>

          {/* Clear All Data Logout */}
          <button
            onClick={() => handleLogout(true)}
            disabled={isLoggingOut}
            className="w-full p-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Trash2 size={18} />
            {isLoggingOut ? "Clearing data..." : "Logout & Clear All Data"}
          </button>

          {/* Warning Text */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 flex items-start gap-3">
            <AlertTriangle
              size={16}
              className="text-yellow-600 mt-0.5 flex-shrink-0"
            />
            <div>
              <p className="text-sm text-yellow-800 font-medium mb-1">
                Clear All Data Warning
              </p>
              <p className="text-xs text-yellow-700">
                This will permanently remove all your stored account information
                from this device, including saved login credentials and user
                data.
              </p>
            </div>
          </div>
        </div>

        {/* Cancel Button */}
        <button
          onClick={onClose}
          className="w-full mt-4 p-3 border border-gray-300 text-[var(--color-text)] rounded-xl hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
