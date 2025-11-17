import { DashboardLayout } from "../../Components/DashboardLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Briefcase,
  FileText,
  Award,
  Save,
  Edit,
  X,
  Plus,
  CheckCircle,
  Sparkles,
  Calendar,
  Mail,
  GraduationCap,
  ArrowLeft,
  Trash2,
  ExternalLink,
  DownloadCloud,
} from "lucide-react";
import { jobProfileAPI } from "../../api/Students/jobProfile";
import type { JobProfileData } from "../../api/Students/jobProfile";

interface JobProfile {
  id: string;
  headline: string;
  bio: string;
  resumeUrl: string;
  skills: string[];
  createdAt: string;
  updatedAt: string;
  student?: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    university: string;
    major: string;
    graduationYear: string;
  };
}

export const JobProfileViewPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [profile, setProfile] = useState<JobProfile | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saveSuccess, setShowSuccess] = useState(false);
  const [currentSkill, setCurrentSkill] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  // Editable state
  const [editedProfile, setEditedProfile] = useState({
    headline: "",
    bio: "",
    resumeUrl: "",
    skills: [] as string[],
  });

  const popularSkills = [
    "JavaScript",
    "Python",
    "React",
    "Node.js",
    "TypeScript",
    "SQL",
    "Git",
    "AWS",
    "Docker",
    "MongoDB",
    "REST APIs",
    "GraphQL",
    "UI/UX Design",
    "Figma",
    "Communication",
    "Leadership",
    "Project Management",
    "Problem Solving",
  ];

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await jobProfileAPI.get();

      // API now returns the profile object (or null) directly
      const profile = response as any;
      if (profile) {
        setProfile(profile);
        setEditedProfile({
          headline: profile.headline || "",
          bio: profile.bio || "",
          resumeUrl: profile.resumeUrl || "",
          skills: profile.skills || [],
        });
      } else {
        setError("No job profile found. Create one first.");
      }
    } catch (error: any) {
      console.error("Error loading profile:", error);
      if (error.response?.status === 404) {
        setError("No job profile found. Create one first.");
      } else {
        setError("Failed to load profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setEditedProfile({
      headline: profile?.headline || "",
      bio: profile?.bio || "",
      resumeUrl: profile?.resumeUrl || "",
      skills: profile?.skills || [],
    });
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditedProfile({
      headline: profile?.headline || "",
      bio: profile?.bio || "",
      resumeUrl: profile?.resumeUrl || "",
      skills: profile?.skills || [],
    });
  };

  const handleAddSkill = (skill: string) => {
    if (skill && !editedProfile.skills.includes(skill)) {
      setEditedProfile({
        ...editedProfile,
        skills: [...editedProfile.skills, skill],
      });
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setEditedProfile({
      ...editedProfile,
      skills: editedProfile.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    try {
      const profileData: JobProfileData = {
        headline: editedProfile.headline || undefined,
        bio: editedProfile.bio || undefined,
        resumeUrl: editedProfile.resumeUrl || undefined,
        skills:
          editedProfile.skills.length > 0 ? editedProfile.skills : undefined,
      };

      const profile = await jobProfileAPI.createOrUpdate(profileData);
      // API returns the created/updated profile directly
      setProfile(profile as any);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error: any) {
      console.error("Error saving profile:", error);
      setError(error.response?.data?.message || "Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your job profile?")) {
      return;
    }

    try {
      await jobProfileAPI.delete();
      navigate("/dashboard/jobs");
    } catch (error: any) {
      console.error("Error deleting profile:", error);
      setError("Failed to delete profile");
    }
  };

  const downloadResume = async () => {
    if (!profile?.resumeUrl) return;
    try {
      setIsDownloading(true);
      // Try to fetch the file and trigger a download
      const res = await fetch(profile.resumeUrl);
      if (!res.ok) throw new Error(`Failed to fetch resume: ${res.status}`);
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // derive a safe filename from URL or student's name
      const urlParts = profile.resumeUrl.split("/");
      let basename = urlParts[urlParts.length - 1] || "resume";
      // strip querystring
      basename = basename.split("?")[0];
      if (!basename.includes(".")) {
        // fallback to student name
        const name = `${profile.student?.firstName || "resume"}_${profile.student?.lastName || ""}`;
        basename = `${name}.pdf`;
      }

      const a = document.createElement("a");
      a.href = url;
      a.download = basename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Download failed, opening resume in new tab:", err);
      // fallback: open in new tab
      window.open(profile?.resumeUrl, "_blank");
    } finally {
      setIsDownloading(false);
    }
  };

  const topNavActions = (
    <div className="flex items-center gap-3">
      {!isEditing ? (
        <>
          <button
            onClick={handleEdit}
            className="flex items-center gap-2 bg-white text-[var(--color-primary)] px-5 py-2 rounded-xl font-semibold hover:bg-[var(--color-light)] transition-all duration-300 shadow-lg"
          >
            <Edit size={18} />
            <span>Edit Profile</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 bg-red-50 text-red-600 px-5 py-2 rounded-xl font-semibold hover:bg-red-100 transition-all duration-300 border border-red-200"
          >
            <Trash2 size={18} />
            <span>Delete</span>
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleCancelEdit}
            className="flex items-center gap-2 bg-gray-100 text-gray-700 px-5 py-2 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-300"
          >
            <X size={18} />
            <span>Cancel</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="flex items-center gap-2 bg-[var(--color-primary)] text-white px-5 py-2 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving...</span>
              </>
            ) : (
              <>
                <Save size={18} />
                <span>Save Changes</span>
              </>
            )}
          </button>
        </>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <DashboardLayout
        icon={<User size={18} className="text-white" />}
        actions={topNavActions}
      >
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-600">Loading profile...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error && !profile) {
    return (
      <DashboardLayout
        icon={<User size={18} className="text-white" />}
        actions={<div></div>}
      >
        <div className="max-w-2xl mx-auto mt-10">
          <div className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase size={40} className="text-red-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">
              No Job Profile Found
            </h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <button
              onClick={() => navigate("/dashboard/build-profile")}
              className="bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg transition-all duration-300"
            >
              Create Your Profile
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      icon={<User size={18} className="text-white" />}
      actions={topNavActions}
    >
      {/* Success Notification */}
      {saveSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-fade-in-up">
          <CheckCircle size={24} />
          <div>
            <p className="font-bold">Profile Updated Successfully!</p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {error && profile && (
        <div className="fixed top-4 right-4 z-50 bg-red-500 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3">
          <X size={24} />
          <div>
            <p className="font-bold">Error</p>
            <p className="text-sm text-red-100">{error}</p>
          </div>
          <button onClick={() => setError(null)} className="ml-2">
            <X size={18} />
          </button>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="relative bg-linear-to-br from-[var(--color-primary)] via-[var(--color-forest)] to-[var(--color-accent)] text-white p-8 lg:p-10 rounded-3xl shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/dashboard/jobs")}
                  className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors"
                >
                  <ArrowLeft size={20} className="text-white" />
                </button>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold mb-2">
                    {isEditing ? "Edit Your Profile" : "Your Job Profile"}
                  </h1>
                  <p className="text-white/90 text-lg">
                    {isEditing
                      ? "Update your professional information"
                      : "Your professional profile for job applications"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl">
                <Sparkles size={16} className="text-white" />
                <span className="text-white text-sm font-medium">
                  {isEditing ? "Editing Mode" : "View Mode"}
                </span>
              </div>
            </div>

            {/* Student Info */}
            {profile?.student && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Mail size={20} className="text-white/80" />
                  <div>
                    <p className="text-white/70 text-xs">Email</p>
                    <p className="text-white font-medium">
                      {profile.student.email}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <GraduationCap size={20} className="text-white/80" />
                  <div>
                    <p className="text-white/70 text-xs">University</p>
                    <p className="text-white font-medium">
                      {profile.student.university}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-sm rounded-xl p-4">
                  <Calendar size={20} className="text-white/80" />
                  <div>
                    <p className="text-white/70 text-xs">Graduation Year</p>
                    <p className="text-white font-medium">
                      {profile.student.graduationYear}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Profile Content */}
        <div className="space-y-6">
          {/* Professional Headline */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Briefcase size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Professional Headline
                </h2>
                <p className="text-gray-600">Your professional identity</p>
              </div>
            </div>

            {isEditing ? (
              <>
                <input
                  type="text"
                  value={editedProfile.headline}
                  onChange={(e) =>
                    setEditedProfile({
                      ...editedProfile,
                      headline: e.target.value,
                    })
                  }
                  placeholder="e.g., Full-Stack Developer | React & Node.js Enthusiast"
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:outline-none transition-colors text-lg"
                  maxLength={120}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {editedProfile.headline.length}/120 characters
                </p>
              </>
            ) : (
              <p className="text-xl text-gray-900 font-medium">
                {profile?.headline || "Not set"}
              </p>
            )}
          </div>

          {/* Professional Bio */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-[var(--color-forest)] to-[var(--color-primary)] rounded-2xl flex items-center justify-center flex-shrink-0">
                <FileText size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Professional Bio
                </h2>
                <p className="text-gray-600">Your experience and goals</p>
              </div>
            </div>

            {isEditing ? (
              <>
                <textarea
                  value={editedProfile.bio}
                  onChange={(e) =>
                    setEditedProfile({ ...editedProfile, bio: e.target.value })
                  }
                  placeholder="Share your professional journey..."
                  className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none text-lg"
                  rows={8}
                  maxLength={1000}
                />
                <p className="text-sm text-gray-500 mt-2">
                  {editedProfile.bio.length}/1000 characters
                </p>
              </>
            ) : (
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                {profile?.bio || "Not set"}
              </p>
            )}
          </div>

          {/* Skills */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-[var(--color-accent)] to-[var(--color-forest)] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Award size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Skills & Expertise
                </h2>
                <p className="text-gray-600">Your technical and soft skills</p>
              </div>
            </div>

            {isEditing ? (
              <>
                {/* Add Skill Input */}
                <div className="flex gap-2 mb-6">
                  <input
                    type="text"
                    value={currentSkill}
                    onChange={(e) => setCurrentSkill(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddSkill(currentSkill);
                      }
                    }}
                    placeholder="Type a skill and press Enter"
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:outline-none transition-colors"
                  />
                  <button
                    onClick={() => handleAddSkill(currentSkill)}
                    className="bg-[var(--color-primary)] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[var(--color-forest)] transition-colors flex items-center gap-2"
                  >
                    <Plus size={18} />
                    Add
                  </button>
                </div>

                {/* Selected Skills */}
                {editedProfile.skills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">
                      Your Skills ({editedProfile.skills.length})
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {editedProfile.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="group bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-4 py-2 rounded-xl font-medium flex items-center gap-2 hover:shadow-lg transition-all"
                        >
                          {skill}
                          <button
                            onClick={() => handleRemoveSkill(skill)}
                            className="hover:bg-white/20 rounded-full p-1 transition-colors"
                          >
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Skills */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 mb-3">
                    Popular Skills (Click to add)
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {popularSkills
                      .filter((skill) => !editedProfile.skills.includes(skill))
                      .map((skill, index) => (
                        <button
                          key={index}
                          onClick={() => handleAddSkill(skill)}
                          className="bg-gray-100 text-gray-700 px-4 py-2 rounded-xl font-medium hover:bg-[var(--color-light)] hover:text-[var(--color-primary)] transition-colors border border-gray-200 hover:border-[var(--color-primary)]"
                        >
                          {skill}
                        </button>
                      ))}
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-wrap gap-3">
                {profile?.skills && profile.skills.length > 0 ? (
                  profile.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-5 py-2.5 rounded-xl font-medium shadow-md"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">No skills added yet</p>
                )}
              </div>
            )}
          </div>

          {/* Resume */}
          {profile?.resumeUrl && (
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-linear-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <FileText size={24} className="text-white" />
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl font-bold text-gray-900 mb-1">
                    Resume
                  </h2>
                  <p className="text-gray-600">Your uploaded resume</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch gap-3">
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors flex-1"
                >
                  <FileText size={24} className="text-green-600" />
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-gray-900">View Resume</p>
                    <p className="text-sm text-gray-600">Click to open</p>
                  </div>
                  <ExternalLink size={20} className="text-green-600" />
                </a>

                <button
                  onClick={downloadResume}
                  disabled={isDownloading}
                  className="flex items-center gap-3 px-5 py-3 bg-white border border-green-200 rounded-xl hover:shadow-md transition-colors disabled:opacity-60"
                >
                  {isDownloading ? (
                    <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <DownloadCloud size={20} className="text-green-600" />
                  )}
                  <span className="font-medium text-gray-900">
                    {isDownloading ? "Downloading..." : "Download Resume"}
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* Profile Meta */}
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  Created:{" "}
                  {new Date(profile?.createdAt || "").toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar size={16} />
                <span>
                  Last Updated:{" "}
                  {new Date(profile?.updatedAt || "").toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};
