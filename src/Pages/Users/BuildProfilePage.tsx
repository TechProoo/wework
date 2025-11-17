import { DashboardLayout } from "../../Components/DashboardLayout";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  User,
  Briefcase,
  FileText,
  Award,
  Save,
  Upload,
  X,
  Plus,
  CheckCircle,
  Sparkles,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { jobProfileAPI } from "../../api/Students/jobProfile";
import type { JobProfileData } from "../../api/Students/jobProfile";

interface JobProfile {
  headline: string;
  bio: string;
  resumeUrl: string;
  skills: string[];
}

export const BuildProfilePage = () => {
  const navigate = useNavigate();
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [saveSuccess, setShowSuccess] = useState(false);
  const [currentSkill, setCurrentSkill] = useState("");
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [profile, setProfile] = useState<JobProfile>({
    headline: "",
    bio: "",
    resumeUrl: "",
    skills: [],
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

  // Load existing profile on mount
  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setIsLoading(true);
      const response = await jobProfileAPI.get();

      // API now returns the profile object (or null) directly
      const profile = response as any;
      if (profile) {
        setProfile({
          headline: profile.headline || "",
          bio: profile.bio || "",
          resumeUrl: profile.resumeUrl || "",
          skills: profile.skills || [],
        });
      }
    } catch (error: any) {
      console.error("Error loading profile:", error);
      // Don't show error for 404 (no profile yet)
      if (error.response?.status !== 404) {
        setError("Failed to load profile");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddSkill = (skill: string) => {
    if (skill && !profile.skills.includes(skill)) {
      setProfile({ ...profile, skills: [...profile.skills, skill] });
      setCurrentSkill("");
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setProfile({
      ...profile,
      skills: profile.skills.filter((skill) => skill !== skillToRemove),
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.type === "application/pdf" || file.type.includes("document")) {
        setResumeFile(file);
      } else {
        alert("Please upload a PDF or document file");
      }
    }
  };

  const handleSaveProfile = async () => {
    setIsSaving(true);
    setError(null);

    try {
      // TODO: Upload resume file to cloudinary if present
      let resumeUrl = profile.resumeUrl;
      if (resumeFile) {
        // For now, we'll use a placeholder URL
        // In production, upload to Cloudinary first
        resumeUrl = `https://example.com/resumes/${resumeFile.name}`;
      }

      const profileData: JobProfileData = {
        headline: profile.headline || undefined,
        bio: profile.bio || undefined,
        resumeUrl: resumeUrl || undefined,
        skills: profile.skills.length > 0 ? profile.skills : undefined,
      };

      await jobProfileAPI.createOrUpdate(profileData);

      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/dashboard/jobs");
      }, 2000);
    } catch (error: any) {
      console.error("Error saving profile:", error);
      setError(
        error.response?.data?.message ||
          "Failed to save profile. Please try again."
      );
    } finally {
      setIsSaving(false);
    }
  };

  const progressPercentage = () => {
    let completed = 0;
    if (profile.headline) completed += 25;
    if (profile.bio) completed += 25;
    if (profile.skills.length > 0) completed += 25;
    if (resumeFile || profile.resumeUrl) completed += 25;
    return completed;
  };

  const topNavActions = (
    <div className="flex items-center gap-4">
      <div className="hidden md:flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/30">
        <Sparkles size={16} className="text-white" />
        <span className="text-white text-sm font-medium">
          {progressPercentage()}% Complete
        </span>
      </div>
      <button
        onClick={handleSaveProfile}
        disabled={isSaving || progressPercentage() < 100}
        className="flex items-center gap-2 bg-white text-[var(--color-primary)] px-6 py-2 rounded-xl font-semibold hover:bg-[var(--color-light)] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {isSaving ? (
          <>
            <div className="w-4 h-4 border-2 border-[var(--color-primary)] border-t-transparent rounded-full animate-spin"></div>
            <span>Saving...</span>
          </>
        ) : (
          <>
            <Save size={18} />
            <span>Save Profile</span>
          </>
        )}
      </button>
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
            <p className="font-bold">Profile Saved Successfully!</p>
            <p className="text-sm text-green-100">
              Redirecting to jobs page...
            </p>
          </div>
        </div>
      )}

      {/* Error Notification */}
      {error && (
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
          {/* Background Elements */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-20 translate-x-20"></div>
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-16 -translate-x-16"></div>

          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => navigate("/dashboard/jobs")}
                className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <ArrowLeft size={20} className="text-white" />
              </button>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center ring-2 ring-[var(--color-accent)]/30">
                  <Briefcase size={28} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl lg:text-4xl font-bold">
                    Build Your Professional Profile
                  </h1>
                  <p className="text-white/90 text-lg mt-1">
                    Stand out to employers with a compelling profile
                  </p>
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6 bg-white/20 backdrop-blur-sm rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-linear-to-r from-white to-[var(--color-accent)] transition-all duration-500 rounded-full relative"
                style={{ width: `${progressPercentage()}%` }}
              >
                <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
            <p className="text-white/80 text-sm mt-2">
              Complete all sections to activate your profile
            </p>
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-6">
          {/* Professional Headline */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Zap size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Professional Headline
                </h2>
                <p className="text-gray-600">
                  A catchy one-liner that describes your professional identity
                </p>
              </div>
            </div>

            <input
              type="text"
              value={profile.headline}
              onChange={(e) =>
                setProfile({ ...profile, headline: e.target.value })
              }
              placeholder="e.g., Full-Stack Developer | React & Node.js Enthusiast | Building Scalable Web Apps"
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:outline-none transition-colors text-lg"
              maxLength={120}
            />
            <p className="text-sm text-gray-500 mt-2">
              {profile.headline.length}/120 characters
            </p>
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
                <p className="text-gray-600">
                  Tell employers about your experience, skills, and career goals
                </p>
              </div>
            </div>

            <textarea
              value={profile.bio}
              onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
              placeholder="Share your professional journey, key achievements, technical skills, and what you're passionate about..."
              className="w-full px-4 py-4 border-2 border-gray-200 rounded-xl focus:border-[var(--color-primary)] focus:outline-none transition-colors resize-none text-lg"
              rows={8}
              maxLength={1000}
            />
            <p className="text-sm text-gray-500 mt-2">
              {profile.bio.length}/1000 characters
            </p>
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
                <p className="text-gray-600">
                  Add your technical and soft skills
                </p>
              </div>
            </div>

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
                placeholder="Type a skill and press Enter or click Add"
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
            {profile.skills.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-semibold text-gray-700 mb-3">
                  Your Skills ({profile.skills.length})
                </h3>
                <div className="flex flex-wrap gap-2">
                  {profile.skills.map((skill, index) => (
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
                  .filter((skill) => !profile.skills.includes(skill))
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
          </div>

          {/* Resume Upload */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-linear-to-br from-[var(--color-forest)] to-[var(--color-accent)] rounded-2xl flex items-center justify-center flex-shrink-0">
                <Upload size={24} className="text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  Upload Resume
                </h2>
                <p className="text-gray-600">
                  Upload your latest resume (PDF or DOC)
                </p>
              </div>
            </div>

            <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-[var(--color-primary)] transition-colors">
              <input
                type="file"
                id="resume-upload"
                accept=".pdf,.doc,.docx"
                onChange={handleFileChange}
                className="hidden"
              />
              <label htmlFor="resume-upload" className="cursor-pointer block">
                {resumeFile || profile.resumeUrl ? (
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto">
                      <FileText size={32} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900">
                        {resumeFile?.name || "Resume uploaded"}
                      </p>
                      {resumeFile && (
                        <p className="text-sm text-gray-500">
                          {(resumeFile.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      )}
                    </div>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setResumeFile(null);
                        setProfile({ ...profile, resumeUrl: "" });
                      }}
                      className="text-red-600 hover:text-red-700 font-medium text-sm"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="w-16 h-16 bg-[var(--color-light)] rounded-2xl flex items-center justify-center mx-auto">
                      <Upload
                        size={32}
                        className="text-[var(--color-primary)]"
                      />
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-gray-900 mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-sm text-gray-500">
                        PDF or DOC (Max 10MB)
                      </p>
                    </div>
                  </div>
                )}
              </label>
            </div>
          </div>
        </div>

        {/* Bottom Action Buttons */}
        <div className="flex items-center justify-between gap-4 bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
          <button
            onClick={() => navigate("/dashboard/jobs")}
            className="text-gray-600 hover:text-gray-900 font-medium flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back to Jobs
          </button>
          <button
            onClick={handleSaveProfile}
            disabled={isSaving || progressPercentage() < 100}
            className="bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white px-8 py-4 rounded-2xl font-bold hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isSaving ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Saving Profile...</span>
              </>
            ) : (
              <>
                <Save size={20} />
                <span>Save & Continue</span>
              </>
            )}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};
