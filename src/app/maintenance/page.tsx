"use client";

import React from "react";

const UnderMaintenancePage = () => {
  const [loading, setLoading] = React.useState(false);
  const handleRefresh = () => {
    setLoading(true);
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-background to-primary-800">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        {/* <div className="flex items-center justify-center mb-6">
          <svg
            className="w-12 h-12 text-primary-500 hover:text-primary-600"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
              clipRule="evenodd"
            />
          </svg>
        </div> */}

        <div className=" w-full flex items-center justify-center">
          <div className="relative h-12 w-12 animate-spin rounded-full border-4 border-primary-500 border-t-transparent" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight md:text-4xl my-4 text-primary-700">
          Under Maintenance
        </h1>

        <p className="mb-6 text-secondary-600 text-sm md:text-base ">
          We're currently performing scheduled maintenance. Please check back
          soon. Thank you for your patience.
        </p>
        <div className="flex justify-center">
          <button
            type="button"
            onClick={handleRefresh}
            className="px-4 py-2.5 text-base font-medium text-white bg-primary-600 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-300"
          >
            {loading ? "Loading..." : "Refresh Page"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default UnderMaintenancePage;
