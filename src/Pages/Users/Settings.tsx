import { DashboardLayout } from "../../Components/DashboardLayout";
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Shield,
  Database,
} from "lucide-react";

export const Settings = () => {
  // This page intentionally has NO actions to test the layout spacing
  return (
    <DashboardLayout
      title="Settings"
      subtitle="Manage your account preferences"
      icon={<SettingsIcon size={18} className="text-white" />}
      className="space-y-6"
    >
      {/* Settings Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">
          Account Settings
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <User size={20} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Profile Information</p>
                <p className="text-sm text-gray-600">
                  Update your personal details
                </p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors">
              Edit
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Bell size={20} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Notifications</p>
                <p className="text-sm text-gray-600">
                  Configure your notification preferences
                </p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors">
              Manage
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Privacy & Security</p>
                <p className="text-sm text-gray-600">
                  Manage your privacy settings
                </p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors">
              Configure
            </button>
          </div>

          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-3">
              <Database size={20} className="text-gray-600" />
              <div>
                <p className="font-medium text-gray-900">Data & Storage</p>
                <p className="text-sm text-gray-600">
                  Manage your data and storage preferences
                </p>
              </div>
            </div>
            <button className="px-4 py-2 text-sm bg-[var(--color-primary)] text-white rounded-lg hover:bg-[var(--color-accent)] transition-colors">
              View
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
