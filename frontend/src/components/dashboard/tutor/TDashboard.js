import React from "react";
import Sidebar from "../Sidebar";

export default function TDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-64 bg-richblue-800 border-r border-richblack-700">
        <Sidebar />
      </div>
      <div className="flex-1 p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Tutor Dashboard</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600">
            Hello!!
          </p>
        </div>
      </div>
    </div>
  );
}