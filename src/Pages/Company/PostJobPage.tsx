import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  MapPin,
  DollarSign,
  Clock,
  Users,
  FileText,
  Briefcase,
  Calendar,
  Tag,
  Globe,
  CheckCircle,
} from "lucide-react";
import toast from "react-hot-toast";
import { createJob } from "../../api/Companies/jobsApi";
import type { CreateJobPayload } from "../../api/Companies/jobsApi";

interface JobFormData {
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Remote" | "";
  experienceLevel: "Entry" | "Mid" | "Senior" | "Lead" | "";
  salaryMin: string;
  salaryMax: string;
  currency: string;
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  skills: string;
  deadline: string;
  positions: string;
}

const PostJobPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<JobFormData>({
    title: "",
    department: "",
    location: "",
    type: "",
    experienceLevel: "",
    salaryMin: "",
    salaryMax: "",
    currency: "USD",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    skills: "",
    deadline: "",
    positions: "1",
  });

  const [errors, setErrors] = useState<Partial<JobFormData>>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name as keyof JobFormData]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<JobFormData> = {};

    if (step === 1) {
      if (!formData.title.trim()) newErrors.title = "Job title is required";
      if (!formData.department.trim())
        newErrors.department = "Department is required";
      if (!formData.location.trim())
        newErrors.location = "Location is required";
      if (!formData.type) newErrors.type = "Job type is required";
      if (!formData.experienceLevel)
        newErrors.experienceLevel = "Experience level is required";
    } else if (step === 2) {
      if (!formData.salaryMin.trim())
        newErrors.salaryMin = "Minimum salary is required";
      if (!formData.salaryMax.trim())
        newErrors.salaryMax = "Maximum salary is required";
      if (
        parseFloat(formData.salaryMin) >= parseFloat(formData.salaryMax)
      ) {
        newErrors.salaryMax = "Maximum salary must be greater than minimum";
      }
    } else if (step === 3) {
      if (!formData.description.trim())
        newErrors.description = "Job description is required";
      if (!formData.responsibilities.trim())
        newErrors.responsibilities = "Responsibilities are required";
      if (!formData.requirements.trim())
        newErrors.requirements = "Requirements are required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateStep(currentStep)) {
      return;
    }

    try {
      // Parse requirements and responsibilities into arrays
      const requirementsArray = formData.requirements
        .split("\n")
        .map((r) => r.trim())
        .filter((r) => r.length > 0);

      const responsibilitiesArray = formData.responsibilities
        .split("\n")
        .map((r) => r.trim())
        .filter((r) => r.length > 0);

      // Combine responsibilities and requirements for the backend
      const allRequirements = [
        ...responsibilitiesArray.map((r) => `Responsibility: ${r}`),
        ...requirementsArray.map((r) => `Requirement: ${r}`),
      ];

      // Add skills if provided
      if (formData.skills.trim()) {
        const skillsArray = formData.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s.length > 0);
        allRequirements.push(
          ...skillsArray.map((s) => `Required Skill: ${s}`)
        );
      }

      // Construct salary range
      const salaryRange =
        formData.salaryMin && formData.salaryMax
          ? `${formData.currency} ${parseInt(formData.salaryMin).toLocaleString()} - ${parseInt(formData.salaryMax).toLocaleString()}`
          : undefined;

      // Prepare job payload for API
      const jobPayload: CreateJobPayload = {
        title: formData.title,
        location: formData.location || undefined,
        remote: formData.type === "Remote",
        description: `${formData.description}\n\n**Department:** ${formData.department}\n**Job Type:** ${formData.type}\n**Experience Level:** ${formData.experienceLevel}\n**Positions Available:** ${formData.positions}${formData.deadline ? `\n**Application Deadline:** ${formData.deadline}` : ""}${formData.benefits ? `\n\n**Benefits:**\n${formData.benefits}` : ""}`,
        requirements: allRequirements,
        salaryRange,
        status: "OPEN",
      };

      // Call API to create job
      await createJob(jobPayload);

      // Navigate back to dashboard on success
      navigate("/company/dashboard");
    } catch (error) {
      // Error handling is done in the API function
      console.error("Error creating job:", error);
    }
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[1, 2, 3, 4].map((step, index) => (
        <div key={step} className="flex items-center">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
              currentStep >= step
                ? "bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] text-white"
                : "bg-gray-200 text-gray-500"
            }`}
          >
            {currentStep > step ? (
              <CheckCircle size={20} />
            ) : (
              <span>{step}</span>
            )}
          </div>
          {index < 3 && (
            <div
              className={`w-16 h-1 mx-2 transition-all ${
                currentStep > step ? "bg-[var(--color-primary)]" : "bg-gray-200"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );

  const renderStep1 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[var(--color-text)] mb-6">
        Basic Information
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Title *
        </label>
        <div className="relative">
          <Briefcase
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <select
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none ${
              errors.title ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select job title</option>
            <optgroup label="Frontend Development">
              <option value="Frontend Developer">Frontend Developer</option>
              <option value="Senior Frontend Developer">Senior Frontend Developer</option>
              <option value="Lead Frontend Developer">Lead Frontend Developer</option>
              <option value="React Developer">React Developer</option>
              <option value="Vue.js Developer">Vue.js Developer</option>
              <option value="Angular Developer">Angular Developer</option>
            </optgroup>
            <optgroup label="Backend Development">
              <option value="Backend Developer">Backend Developer</option>
              <option value="Senior Backend Developer">Senior Backend Developer</option>
              <option value="Lead Backend Developer">Lead Backend Developer</option>
              <option value="Node.js Developer">Node.js Developer</option>
              <option value="Python Developer">Python Developer</option>
              <option value="Java Developer">Java Developer</option>
              <option value=".NET Developer">.NET Developer</option>
            </optgroup>
            <optgroup label="Full Stack Development">
              <option value="Full Stack Developer">Full Stack Developer</option>
              <option value="Senior Full Stack Developer">Senior Full Stack Developer</option>
              <option value="MERN Stack Developer">MERN Stack Developer</option>
              <option value="MEAN Stack Developer">MEAN Stack Developer</option>
            </optgroup>
            <optgroup label="Mobile Development">
              <option value="Mobile Developer">Mobile Developer</option>
              <option value="iOS Developer">iOS Developer</option>
              <option value="Android Developer">Android Developer</option>
              <option value="React Native Developer">React Native Developer</option>
              <option value="Flutter Developer">Flutter Developer</option>
            </optgroup>
            <optgroup label="DevOps & Cloud">
              <option value="DevOps Engineer">DevOps Engineer</option>
              <option value="Cloud Engineer">Cloud Engineer</option>
              <option value="Site Reliability Engineer">Site Reliability Engineer</option>
              <option value="Platform Engineer">Platform Engineer</option>
              <option value="AWS Engineer">AWS Engineer</option>
              <option value="Azure Engineer">Azure Engineer</option>
            </optgroup>
            <optgroup label="Data & AI">
              <option value="Data Scientist">Data Scientist</option>
              <option value="Data Engineer">Data Engineer</option>
              <option value="Machine Learning Engineer">Machine Learning Engineer</option>
              <option value="AI Engineer">AI Engineer</option>
              <option value="Data Analyst">Data Analyst</option>
            </optgroup>
            <optgroup label="Design">
              <option value="UI/UX Designer">UI/UX Designer</option>
              <option value="Product Designer">Product Designer</option>
              <option value="UX Researcher">UX Researcher</option>
              <option value="Graphic Designer">Graphic Designer</option>
            </optgroup>
            <optgroup label="Quality Assurance">
              <option value="QA Engineer">QA Engineer</option>
              <option value="Test Automation Engineer">Test Automation Engineer</option>
              <option value="QA Lead">QA Lead</option>
            </optgroup>
            <optgroup label="Security">
              <option value="Security Engineer">Security Engineer</option>
              <option value="Cybersecurity Analyst">Cybersecurity Analyst</option>
              <option value="Penetration Tester">Penetration Tester</option>
            </optgroup>
            <optgroup label="Product & Management">
              <option value="Product Manager">Product Manager</option>
              <option value="Technical Product Manager">Technical Product Manager</option>
              <option value="Engineering Manager">Engineering Manager</option>
              <option value="Technical Lead">Technical Lead</option>
              <option value="Scrum Master">Scrum Master</option>
              <option value="Project Manager">Project Manager</option>
            </optgroup>
            <optgroup label="Other">
              <option value="Blockchain Developer">Blockchain Developer</option>
              <option value="Game Developer">Game Developer</option>
              <option value="Systems Architect">Systems Architect</option>
              <option value="Solutions Architect">Solutions Architect</option>
              <option value="Technical Writer">Technical Writer</option>
            </optgroup>
          </select>
        </div>
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          Don't see your role? You can type a custom title after selecting "Other"
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Department *
          </label>
          <div className="relative">
            <Building2
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              name="department"
              value={formData.department}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none ${
                errors.department ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select department</option>
              <option value="Engineering">Engineering</option>
              <option value="Product">Product</option>
              <option value="Design">Design</option>
              <option value="Data Science">Data Science</option>
              <option value="DevOps">DevOps</option>
              <option value="Quality Assurance">Quality Assurance</option>
              <option value="Mobile Development">Mobile Development</option>
              <option value="Security">Security</option>
              <option value="IT Support">IT Support</option>
              <option value="Management">Management</option>
            </select>
          </div>
          {errors.department && (
            <p className="mt-1 text-sm text-red-500">{errors.department}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Location *
          </label>
          <div className="relative">
            <MapPin
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Lagos, Nigeria"
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                errors.location ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.location && (
            <p className="mt-1 text-sm text-red-500">{errors.location}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Job Type *
          </label>
          <div className="relative">
            <Clock
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none ${
                errors.type ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
          {errors.type && (
            <p className="mt-1 text-sm text-red-500">{errors.type}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level *
          </label>
          <div className="relative">
            <Tag
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <select
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none ${
                errors.experienceLevel ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select level</option>
              <option value="Entry">Entry Level</option>
              <option value="Mid">Mid Level</option>
              <option value="Senior">Senior Level</option>
              <option value="Lead">Lead/Principal</option>
            </select>
          </div>
          {errors.experienceLevel && (
            <p className="mt-1 text-sm text-red-500">
              {errors.experienceLevel}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Positions
          </label>
          <div className="relative">
            <Users
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="number"
              name="positions"
              value={formData.positions}
              onChange={handleChange}
              min="1"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Application Deadline
          </label>
          <div className="relative">
            <Calendar
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[var(--color-text)] mb-6">
        Salary Information
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Currency
        </label>
        <div className="relative">
          <Globe
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            size={18}
          />
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent appearance-none"
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="NGN">NGN (₦)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Minimum Salary *
          </label>
          <div className="relative">
            <DollarSign
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="number"
              name="salaryMin"
              value={formData.salaryMin}
              onChange={handleChange}
              placeholder="e.g., 50000"
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                errors.salaryMin ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.salaryMin && (
            <p className="mt-1 text-sm text-red-500">{errors.salaryMin}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Maximum Salary *
          </label>
          <div className="relative">
            <DollarSign
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              type="number"
              name="salaryMax"
              value={formData.salaryMax}
              onChange={handleChange}
              placeholder="e.g., 80000"
              className={`w-full pl-10 pr-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent ${
                errors.salaryMax ? "border-red-500" : "border-gray-300"
              }`}
            />
          </div>
          {errors.salaryMax && (
            <p className="mt-1 text-sm text-red-500">{errors.salaryMax}</p>
          )}
        </div>
      </div>

      <div className="p-4 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-sm text-blue-800">
          <strong>Salary Range Preview:</strong>{" "}
          {formData.salaryMin && formData.salaryMax
            ? `${formData.currency} ${parseInt(formData.salaryMin).toLocaleString()} - ${parseInt(formData.salaryMax).toLocaleString()} per year`
            : "Enter salary range above"}
        </p>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[var(--color-text)] mb-6">
        Job Details
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Job Description *
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          placeholder="Describe the role, what the candidate will be doing, and what makes this opportunity exciting..."
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none ${
            errors.description ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Key Responsibilities *
        </label>
        <textarea
          name="responsibilities"
          value={formData.responsibilities}
          onChange={handleChange}
          rows={5}
          placeholder="List the main responsibilities (one per line)..."
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none ${
            errors.responsibilities ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.responsibilities && (
          <p className="mt-1 text-sm text-red-500">{errors.responsibilities}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Requirements & Qualifications *
        </label>
        <textarea
          name="requirements"
          value={formData.requirements}
          onChange={handleChange}
          rows={5}
          placeholder="List the required skills, experience, and qualifications (one per line)..."
          className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none ${
            errors.requirements ? "border-red-500" : "border-gray-300"
          }`}
        />
        {errors.requirements && (
          <p className="mt-1 text-sm text-red-500">{errors.requirements}</p>
        )}
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-[var(--color-text)] mb-6">
        Additional Information
      </h3>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Benefits & Perks
        </label>
        <textarea
          name="benefits"
          value={formData.benefits}
          onChange={handleChange}
          rows={4}
          placeholder="List the benefits and perks (e.g., health insurance, remote work, professional development)..."
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Required Skills (comma-separated)
        </label>
        <div className="relative">
          <FileText
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />
          <textarea
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            rows={3}
            placeholder="e.g., React, TypeScript, Node.js, Git, Agile"
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent resize-none"
          />
        </div>
        <p className="mt-1 text-xs text-gray-500">
          These will be displayed as tags on the job posting
        </p>
      </div>

      {/* Preview */}
      <div className="mt-8 p-6 bg-[var(--color-light)] border border-gray-200 rounded-2xl">
        <h4 className="text-lg font-semibold text-[var(--color-text)] mb-4">
          Preview
        </h4>
        <div className="space-y-3">
          <div>
            <h5 className="text-xl font-bold text-[var(--color-text)]">
              {formData.title || "Job Title"}
            </h5>
            <p className="text-sm text-gray-600 mt-1">
              {formData.department || "Department"} •{" "}
              {formData.location || "Location"} • {formData.type || "Type"}
            </p>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <DollarSign size={16} />
            <span>
              {formData.salaryMin && formData.salaryMax
                ? `${formData.currency} ${parseInt(formData.salaryMin).toLocaleString()} - ${parseInt(formData.salaryMax).toLocaleString()}`
                : "Salary not specified"}
            </span>
          </div>
          {formData.skills && (
            <div className="flex flex-wrap gap-2 mt-3">
              {formData.skills.split(",").map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white border border-[var(--color-primary)]/30 text-[var(--color-primary)] rounded-full text-xs font-medium"
                >
                  {skill.trim()}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[var(--color-light)] pb-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate("/company/dashboard")}
            className="flex items-center gap-2 text-gray-600 hover:text-[var(--color-primary)] mb-4 transition-colors"
          >
            <ArrowLeft size={20} />
            <span>Back to Dashboard</span>
          </button>
          <h1 className="text-3xl font-bold text-[var(--color-text)]">
            Post a New Job
          </h1>
          <p className="text-gray-600 mt-2">
            Fill in the details to create a job posting
          </p>
        </div>

        {/* Step Indicator */}
        {renderStepIndicator()}

        {/* Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <form onSubmit={handleSubmit}>
            {currentStep === 1 && renderStep1()}
            {currentStep === 2 && renderStep2()}
            {currentStep === 3 && renderStep3()}
            {currentStep === 4 && renderStep4()}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handlePrevious}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  currentStep === 1
                    ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                Previous
              </button>

              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-6 py-3 bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl font-medium hover:shadow-lg transition-all"
                >
                  Next Step
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-8 py-3 bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] text-white rounded-xl font-medium hover:shadow-lg transition-all flex items-center gap-2"
                >
                  <CheckCircle size={20} />
                  Post Job
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostJobPage;
