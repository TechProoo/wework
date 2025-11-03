import React from "react";

export const AuthLoader: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-500">
      <div className="animate-fadeIn text-center">
        {/* Spinner */}
        <div className="relative w-20 h-20 mx-auto mb-6">
          <div className="absolute inset-0 rounded-full border-4 border-t-transparent border-blue-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full bg-white dark:bg-gray-900"></div>
        </div>

        {/* Text */}
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-2 tracking-tight">
          Authenticating...
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          Please wait😊
        </p>
      </div>
    </div>
  );
};

export default AuthLoader;
