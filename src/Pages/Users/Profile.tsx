import { useAuth } from "../../contexts/AuthContext";
import { DashboardLayout } from "../../Components/DashboardLayout";
import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Edit,
  Save,
  X,
  Camera,
  Building,
  Calendar,
  Award,
  MapPin as LocationIcon,
  FileText,
} from "lucide-react";

export const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({
    ...user,
    bio: "",
    skills: [],
    interests: [],
  });

  useEffect(() => {
    if (user) {
      setFormData({
        ...user,
        bio: (user as any)?.bio || "",
        skills: (user as any)?.skills || [],
        interests: (user as any)?.interests || [],
      });
    }
  }, [user]);

  const handleSave = () => {
    // Here you would typically save to your backend/API
    console.log("Saving profile data:", formData);

    // Update the user context or local storage
    const updatedUser = { ...user, ...formData };
    localStorage.setItem("user", JSON.stringify(updatedUser));

    setIsEditing(false);

    // Show success message
    alert("Profile updated successfully!");
  };

  const handleCancel = () => {
    setFormData({
      ...user,
      bio: (user as any)?.bio || "",
      skills: (user as any)?.skills || [],
      interests: (user as any)?.interests || [],
    });
    setIsEditing(false);
  };

  const handleSkillAdd = (skill: string) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({
        ...formData,
        skills: [...formData.skills, skill],
      });
    }
  };

  const handleSkillRemove = (skillToRemove: string) => {
    setFormData({
      ...formData,
      skills: formData.skills.filter(
        (skill: string) => skill !== skillToRemove
      ),
    });
  };

  if (!user) return null;

  const profileActions = (
    <>
      {isEditing ? (
        <>
          <button
            onClick={handleCancel}
            className="flex items-center gap-2 px-3 py-1.5 text-xs border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            <X size={14} />
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-3 py-1.5 text-xs bg-[var(--color-primary)] text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            <Save size={14} />
            Save
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsEditing(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs bg-[var(--color-primary)] text-white rounded-lg hover:bg-opacity-90 transition-colors"
        >
          <Edit size={14} />
          Edit Profile
        </button>
      )}
    </>
  );

  return (
    <DashboardLayout
      title="Profile Settings"
      subtitle="Manage your account information"
      icon={<User size={18} className="text-white" />}
      actions={profileActions}
      className="space-y-6"
      removeTopPadding={true}
    >
      {/* Profile Overview Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
          <div className="relative">
            <div className="w-20 h-20 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center">
              <User size={32} className="text-white" />
            </div>
            {isEditing && (
              <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-gray-200 text-gray-600 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors">
                <Camera size={14} />
              </button>
            )}
          </div>

          <div className="flex-1">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">
              {user.userType === "student"
                ? `${user.firstName} ${user.lastName}`
                : user.companyName}
            </h2>
            <p className="text-gray-600 mb-2 capitalize">
              {user.userType} Account
            </p>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <Mail size={14} />
                {user.email}
              </span>
              {user.userType === "student" && user.city && user.country && (
                <span className="flex items-center gap-1">
                  <LocationIcon size={14} />
                  {user.city}, {user.country}
                </span>
              )}
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                Member since {new Date().getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <FileText size={18} className="text-[var(--color-primary)]" />
          About Me
        </h3>
        {isEditing ? (
          <textarea
            value={formData.bio || ""}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            placeholder="Write a short bio about yourself..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
          />
        ) : (
          <p className="text-gray-600 leading-relaxed">
            {formData.bio ||
              "No bio added yet. Click 'Edit Profile' to add a short description about yourself."}
          </p>
        )}
      </div>

      {/* Profile Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User size={18} className="text-[var(--color-primary)]" />
            Personal Information
          </h3>

          <div className="space-y-4">
            {user.userType === "student" ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      First Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.firstName || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            firstName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                      />
                    ) : (
                      <div className="py-2 px-3 bg-gray-50 rounded-lg border text-gray-700">
                        {user.firstName || "Not set"}
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-700">
                      Last Name
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={formData.lastName || ""}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            lastName: e.target.value,
                          })
                        }
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                      />
                    ) : (
                      <div className="py-2 px-3 bg-gray-50 rounded-lg border text-gray-700">
                        {user.lastName || "Not set"}
                      </div>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Email
                  </label>
                  <div className="py-2 px-3 bg-gray-50 rounded-lg border text-gray-700">
                    {user.email}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Phone
                  </label>
                  {isEditing ? (
                    <input
                      type="tel"
                      value={formData.phone || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          phone: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    />
                  ) : (
                    <div className="py-2 px-3 bg-gray-50 rounded-lg border text-gray-700">
                      {user.phone || "Not set"}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Company Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={formData.companyName || ""}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          companyName: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    />
                  ) : (
                    <div className="py-2 px-3 bg-gray-50 rounded-lg border text-gray-700">
                      {user.companyName || "Not set"}
                    </div>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-700">
                    Email
                  </label>
                  <div className="py-2 px-3 bg-gray-50 rounded-lg border text-gray-700">
                    {user.email}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Skills & Interests */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Award size={18} className="text-[var(--color-primary)]" />
            Skills & Interests
          </h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-700">
                Skills
              </label>
              {isEditing ? (
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Add a skill and press Enter"
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        const skill = e.currentTarget.value.trim();
                        if (skill) {
                          handleSkillAdd(skill);
                          e.currentTarget.value = "";
                        }
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                  />
                  <div className="flex flex-wrap gap-2">
                    {formData.skills?.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-1 px-3 py-1 bg-[var(--color-primary)] text-white text-sm rounded-full"
                      >
                        {skill}
                        <button
                          type="button"
                          onClick={() => handleSkillRemove(skill)}
                          className="ml-1 text-white hover:text-red-200"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {formData.skills?.length > 0 ? (
                    formData.skills.map((skill: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-[var(--color-primary)] text-white text-sm rounded-full"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 italic text-sm">
                      No skills added yet
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Account Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Building size={18} className="text-[var(--color-primary)]" />
          Account Statistics
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[var(--color-primary)] mb-1">
              {new Date().getFullYear()}
            </div>
            <div className="text-sm text-gray-600">Member Since</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[var(--color-primary)] mb-1 capitalize">
              {user.userType}
            </div>
            <div className="text-sm text-gray-600">Account Type</div>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-[var(--color-primary)] mb-1">
              {formData.skills?.length || 0}
            </div>
            <div className="text-sm text-gray-600">Skills Added</div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Profile;
