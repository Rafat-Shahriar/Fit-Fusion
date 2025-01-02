import React, { useState } from 'react';
import { FiActivity, FiUser, FiCalendar, FiTrendingUp, FiTarget, FiPlus, FiEdit2, FiChevronRight } from 'react-icons/fi';

const Profile = () => {
  const [userData, setUserData] = useState({
    name: "John Doe",
    age: "28",
    height: "175",
    weight: "70",
    dailyExercise: "30 minutes cardio, strength training",
    goals: [],
  });

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-zinc-900 border-red-600 border-2 rounded-xl shadow-lg p-6">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <div className="flex items-center space-x-4">
              <div className="bg-red-600 p-3 rounded-full animate-pulse">
                <FiActivity className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">Fitness Dashboard</h1>
                <p className="text-red-400">Transform & Conquer</p>
              </div>
            </div>
            <div className="flex space-x-3">
              <button className="flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-600/30">
                <FiPlus className="w-4 h-4 mr-2" />
                Add Goal
              </button>
              <button className="flex items-center px-4 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 transition-all duration-300 transform hover:scale-105">
                <FiEdit2 className="w-4 h-4 mr-2" />
                Edit
              </button>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            {[
              { label: "Name", value: userData.name, icon: <FiUser className="w-5 h-5" /> },
              { label: "Age", value: `${userData.age} years`, icon: <FiCalendar className="w-5 h-5" /> },
              { label: "Height", value: `${userData.height} cm`, icon: <FiTrendingUp className="w-5 h-5" /> },
              { label: "Weight", value: `${userData.weight} kg`, icon: <FiTarget className="w-5 h-5" /> },
            ].map((stat, index) => (
              <div
                key={index}
                className="bg-zinc-800 rounded-xl p-4 transform hover:scale-105 transition-all duration-300 border border-red-600/20 hover:border-red-600"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <div className="text-red-500">{stat.icon}</div>
                  <p className="text-sm font-medium text-gray-400">{stat.label}</p>
                </div>
                <p className="text-lg font-bold text-white">{stat.value}</p>
              </div>
            ))}
          </div>

          {/* Daily Routine Section */}
          <div className="bg-gradient-to-r from-red-900 to-red-600 rounded-xl p-6 text-white mb-8 relative overflow-hidden group">
            <div className="absolute inset-0 bg-black/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-3">
                <FiActivity className="w-6 h-6 text-white" />
                <h3 className="text-xl font-bold">Daily Routine</h3>
              </div>
              <p className="text-red-100 font-medium">{userData.dailyExercise}</p>
            </div>
            <FiChevronRight className="absolute right-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-white/50 group-hover:text-white group-hover:translate-x-2 transition-all" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
