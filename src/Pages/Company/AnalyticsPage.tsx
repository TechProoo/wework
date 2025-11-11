import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Clock,
  Target,
  Award,
  Download,
  BarChart3,
  PieChart,
  Activity,
  MapPin,
  Star,
} from "lucide-react";

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState("30d");
  const [selectedMetric, setSelectedMetric] = useState("applications");

  // Sample analytics data - replace with real API calls
  const overviewStats = {
    totalApplications: 456,
    applicationGrowth: 23.5,
    averageTimeToHire: 18,
    timeToHireChange: -12.3,
    offerAcceptanceRate: 78.4,
    acceptanceRateChange: 5.2,
    costPerHire: 2840,
    costChange: -8.7,
  };

  const applicationTrends = [
    { date: "2024-01-01", applications: 45, interviews: 12, hires: 3 },
    { date: "2024-01-02", applications: 38, interviews: 15, hires: 4 },
    { date: "2024-01-03", applications: 52, interviews: 18, hires: 2 },
    { date: "2024-01-04", applications: 41, interviews: 14, hires: 5 },
    { date: "2024-01-05", applications: 47, interviews: 16, hires: 3 },
    { date: "2024-01-06", applications: 33, interviews: 11, hires: 2 },
    { date: "2024-01-07", applications: 49, interviews: 19, hires: 4 },
  ];

  const topSources = [
    { name: "LinkedIn", applications: 156, percentage: 34.2, change: 12.5 },
    {
      name: "Company Website",
      applications: 134,
      percentage: 29.4,
      change: 8.3,
    },
    { name: "Indeed", applications: 89, percentage: 19.5, change: -3.2 },
    { name: "Referrals", applications: 45, percentage: 9.9, change: 15.7 },
    { name: "Other", applications: 32, percentage: 7.0, change: -1.8 },
  ];

  const topPositions = [
    {
      title: "Senior Frontend Developer",
      applications: 89,
      avgRating: 4.2,
      fillRate: 85,
    },
    { title: "UX Designer", applications: 67, avgRating: 4.5, fillRate: 92 },
    {
      title: "Product Manager",
      applications: 54,
      avgRating: 4.1,
      fillRate: 78,
    },
    {
      title: "Backend Developer",
      applications: 43,
      avgRating: 4.3,
      fillRate: 88,
    },
    { title: "Data Scientist", applications: 38, avgRating: 4.0, fillRate: 73 },
  ];

  const locationInsights = [
    { location: "Lagos, Nigeria", applications: 145, percentage: 31.8 },
    { location: "Accra, Ghana", applications: 98, percentage: 21.5 },
    { location: "Cape Town, SA", applications: 87, percentage: 19.1 },
    { location: "Nairobi, Kenya", applications: 76, percentage: 16.7 },
    { location: "Casablanca, Morocco", applications: 50, percentage: 11.0 },
  ];

  const hiringFunnel = [
    { stage: "Applications", count: 456, percentage: 100, dropoff: 0 },
    { stage: "Screening", count: 287, percentage: 63, dropoff: 37 },
    { stage: "First Interview", count: 156, percentage: 34, dropoff: 29 },
    { stage: "Technical Assessment", count: 89, percentage: 20, dropoff: 14 },
    { stage: "Final Interview", count: 54, percentage: 12, dropoff: 8 },
    { stage: "Offer", count: 23, percentage: 5, dropoff: 7 },
    { stage: "Hired", count: 18, percentage: 4, dropoff: 1 },
  ];

  const getChangeColor = (change: number) => {
    if (change > 0) return "text-green-600";
    if (change < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp size={14} className="text-green-500" />;
    if (change < 0) return <TrendingDown size={14} className="text-red-500" />;
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-lg md:text-xl font-bold text-[var(--color-text)] mb-1">
              Hiring Analytics
            </h2>
            <p className="text-sm text-gray-600">
              Track your recruitment performance and insights
            </p>
          </div>
          <div className="flex items-center gap-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)]/20 text-sm bg-white"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
            <button className="px-4 py-2 bg-[var(--color-primary)] text-white rounded-xl hover:bg-[var(--color-primary)]/90 transition-colors text-sm font-medium flex items-center gap-2">
              <Download size={16} />
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-xl">
              <Users size={16} className="text-white" />
            </div>
            <div className="flex items-center gap-1">
              {getChangeIcon(overviewStats.applicationGrowth)}
              <span
                className={`text-xs font-medium ${getChangeColor(
                  overviewStats.applicationGrowth
                )}`}
              >
                {Math.abs(overviewStats.applicationGrowth)}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">
              Total Applications
            </p>
            <p className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
              {overviewStats.totalApplications}
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-linear-to-br from-[var(--color-accent)] to-[var(--color-slate)] rounded-xl">
              <Clock size={16} className="text-white" />
            </div>
            <div className="flex items-center gap-1">
              {getChangeIcon(overviewStats.timeToHireChange)}
              <span
                className={`text-xs font-medium ${getChangeColor(
                  overviewStats.timeToHireChange
                )}`}
              >
                {Math.abs(overviewStats.timeToHireChange)}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">
              Avg. Time to Hire
            </p>
            <p className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
              {overviewStats.averageTimeToHire}d
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-linear-to-br from-[var(--color-slate)] to-[var(--color-primary)] rounded-xl">
              <Target size={16} className="text-white" />
            </div>
            <div className="flex items-center gap-1">
              {getChangeIcon(overviewStats.acceptanceRateChange)}
              <span
                className={`text-xs font-medium ${getChangeColor(
                  overviewStats.acceptanceRateChange
                )}`}
              >
                {Math.abs(overviewStats.acceptanceRateChange)}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">
              Offer Accept Rate
            </p>
            <p className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
              {overviewStats.offerAcceptanceRate}%
            </p>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-slate)] rounded-xl">
              <Award size={16} className="text-white" />
            </div>
            <div className="flex items-center gap-1">
              {getChangeIcon(overviewStats.costChange)}
              <span
                className={`text-xs font-medium ${getChangeColor(
                  overviewStats.costChange
                )}`}
              >
                {Math.abs(overviewStats.costChange)}%
              </span>
            </div>
          </div>
          <div>
            <p className="text-xs md:text-sm text-gray-600 mb-1">
              Cost per Hire
            </p>
            <p className="text-xl md:text-2xl font-bold text-[var(--color-text)]">
              ${overviewStats.costPerHire.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Application Trends */}
        <div className="xl:col-span-2 bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)] mb-1">
                Application Trends
              </h3>
              <p className="text-sm text-gray-600">
                Daily applications, interviews, and hires
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setSelectedMetric("applications")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedMetric === "applications"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Applications
              </button>
              <button
                onClick={() => setSelectedMetric("interviews")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedMetric === "interviews"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Interviews
              </button>
              <button
                onClick={() => setSelectedMetric("hires")}
                className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors ${
                  selectedMetric === "hires"
                    ? "bg-[var(--color-primary)] text-white"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Hires
              </button>
            </div>
          </div>

          {/* Simple Chart Representation */}
          <div className="h-64 flex items-end justify-between gap-2 mb-4">
            {applicationTrends.map((data, index) => {
              const maxValue = Math.max(
                ...applicationTrends.map(
                  (d) => d[selectedMetric as keyof typeof d] as number
                )
              );
              const value = data[selectedMetric as keyof typeof data] as number;
              const height = (value / maxValue) * 100;

              return (
                <div
                  key={index}
                  className="flex-1 flex flex-col items-center gap-2"
                >
                  <div className="text-xs text-gray-600 font-medium">
                    {value}
                  </div>
                  <div
                    className="w-full bg-gradient-to-t from-[var(--color-primary)] to-[var(--color-accent)] rounded-t-lg min-h-[8px] transition-all duration-300"
                    style={{ height: `${Math.max(height, 8)}%` }}
                  />
                  <div className="text-xs text-gray-500">
                    {new Date(data.date).getDate()}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 border-t border-gray-100">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--color-primary)] rounded-full"></div>
              <span className="text-sm text-gray-600">Applications</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--color-accent)] rounded-full"></div>
              <span className="text-sm text-gray-600">Interviews</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-[var(--color-slate)] rounded-full"></div>
              <span className="text-sm text-gray-600">Hires</span>
            </div>
          </div>
        </div>

        {/* Top Sources */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)]">
              Top Sources
            </h3>
            <PieChart size={20} className="text-gray-400" />
          </div>

          <div className="space-y-4">
            {topSources.map((source, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-3 h-3 rounded-full bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)]" />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-[var(--color-text)] truncate">
                      {source.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {source.applications} applications
                    </p>
                  </div>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-[var(--color-text)]">
                    {source.percentage}%
                  </p>
                  <div className="flex items-center gap-1">
                    {getChangeIcon(source.change)}
                    <span
                      className={`text-xs ${getChangeColor(source.change)}`}
                    >
                      {Math.abs(source.change)}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Additional Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Hiring Funnel */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)]">
              Hiring Funnel
            </h3>
            <Activity size={20} className="text-gray-400" />
          </div>

          <div className="space-y-3">
            {hiringFunnel.map((stage, index) => (
              <div key={index} className="relative">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-[var(--color-text)]">
                    {stage.stage}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">{stage.count}</span>
                    <span className="text-xs text-gray-500">
                      ({stage.percentage}%)
                    </span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div
                    className="h-2 bg-linear-to-r from-[var(--color-primary)] to-[var(--color-accent)] rounded-full transition-all duration-300"
                    style={{ width: `${stage.percentage}%` }}
                  />
                </div>
                {stage.dropoff > 0 && (
                  <span className="text-xs text-red-500 mt-1 block">
                    -{stage.dropoff}% dropoff
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Top Performing Positions */}
        <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)]">
              Top Performing Positions
            </h3>
            <BarChart3 size={20} className="text-gray-400" />
          </div>

          <div className="space-y-4">
            {topPositions.map((position, index) => (
              <div
                key={index}
                className="p-3 bg-[var(--color-light)] rounded-xl"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-[var(--color-text)] truncate">
                    {position.title}
                  </h4>
                  <div className="flex items-center gap-1">
                    <Star size={12} className="text-yellow-500 fill-current" />
                    <span className="text-xs font-medium">
                      {position.avgRating}
                    </span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                  <div>
                    <span className="text-gray-500">Applications:</span>
                    <span className="font-medium ml-1">
                      {position.applications}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-500">Fill Rate:</span>
                    <span className="font-medium ml-1">
                      {position.fillRate}%
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Location Insights */}
      <div className="bg-white rounded-2xl p-4 md:p-6 border border-[var(--color-slate)]/20 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-base md:text-lg font-semibold text-[var(--color-text)]">
            Applications by Location
          </h3>
          <MapPin size={20} className="text-gray-400" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {locationInsights.map((location, index) => (
            <div
              key={index}
              className="text-center p-4 bg-[var(--color-light)] rounded-xl"
            >
              <div className="w-12 h-12 bg-linear-to-br from-[var(--color-primary)] to-[var(--color-accent)] rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin size={20} className="text-white" />
              </div>
              <h4 className="text-sm font-medium text-[var(--color-text)] mb-1 truncate">
                {location.location}
              </h4>
              <p className="text-lg font-bold text-[var(--color-primary)] mb-1">
                {location.applications}
              </p>
              <p className="text-xs text-gray-600">{location.percentage}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
