import { useState, useEffect } from "react";
import {
  FiActivity,
  FiTrendingUp,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { CiDumbbell, CiTimer } from "react-icons/ci";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import SharedTitle from "../../Components/Shared/SharedTitle";

const WorkoutDashboard = () => {
  const { user } = useAuth();
  const [weeklyData, setWeeklyData] = useState([]);
  const [currentWeek, setCurrentWeek] = useState(getCurrentISOWeek());

  // Function to calculate current ISO week number
  function getCurrentISOWeek() {
    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);
    const daysSinceStartOfYear = Math.floor(
      (now - startOfYear + (startOfYear.getTimezoneOffset() - now.getTimezoneOffset()) * 60000) / (1000 * 60 * 60 * 24)
    );
    return Math.ceil((daysSinceStartOfYear + startOfYear.getDay() + 1) / 7);
  }

  // Function to get the week range
  const getWeekRange = (weekOffset = 0) => {
    const now = new Date();
    const start = new Date(now);
    start.setDate(start.getDate() - start.getDay() + weekOffset * 7);
    const end = new Date(start);
    end.setDate(start.getDate() + 6);

    return {
      start: start.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      end: end.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
    };
  };

  useEffect(() => {
    const fetchWeeklyData = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/allWeakWorkout/${user.email}?weekNumber=${currentWeek}`
        );
        setWeeklyData(response.data);
      } catch (error) {
        console.error("Error fetching weekly data:", error);
        setWeeklyData([]);
      }
    };

    fetchWeeklyData();
  }, [user.email, currentWeek]);

  const weekRange = getWeekRange(currentWeek);

  // Week navigation handlers
  const goToPreviousWeek = () => setCurrentWeek((prev) => prev - 1);
  const goToNextWeek = () => setCurrentWeek((prev) => prev + 1);
  const goToCurrentWeek = () => setCurrentWeek(getCurrentISOWeek());

  // Calculate weekly stats
  const getWeeklyStats = () => {
    if (!Array.isArray(weeklyData) || weeklyData.length === 0) {
      return {
        totalCalories: 0,
        totalWorkouts: 0,
        avgDuration: 0,
        totalDistance: 0,
      };
    }

    return {
      totalCalories: weeklyData.reduce(
        (sum, day) => sum + (day.totalCalories || 0),
        0
      ),
      totalWorkouts: weeklyData.reduce(
        (sum, day) =>
          sum + (Array.isArray(day.exercises) ? day.exercises.length : 0),
        0
      ),
      avgDuration: calculateAvgDuration(weeklyData),
      totalDistance: calculateTotalDistance(weeklyData),
    };
  };

  const calculateAvgDuration = (data) => {
    let totalDuration = 0;
    let count = 0;
    data.forEach((day) => {
      if (Array.isArray(day.exercises)) {
        day.exercises.forEach((ex) => {
          totalDuration += parseInt(ex.times) || 0;
          count++;
        });
      }
    });
    return count > 0 ? Math.round(totalDuration / count) : 0;
  };

  const calculateTotalDistance = (data) => {
    return data.reduce((sum, day) => {
      if (Array.isArray(day.exercises)) {
        return (
          sum +
          day.exercises.reduce(
            (total, ex) => total + (parseInt(ex.distance) || 0),
            0
          )
        );
      }
      return sum;
    }, 0);
  };

  const stats = getWeeklyStats();

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
      <SharedTitle heading=" Weekly Workout Dashboard"/>

        {/* Week Selector */}
        <div className="flex justify-center items-center gap-4 mb-8">
          <button
            onClick={goToPreviousWeek}
            className="p-2 text-red-500 hover:text-red-400"
          >
            <FiChevronLeft size={24} />
          </button>
          <div className="text-white text-lg">
            {weekRange.start} - {weekRange.end}
          </div>
          <button
            onClick={goToNextWeek}
            className="p-2 text-red-500 hover:text-red-400"
          >
            <FiChevronRight size={24} />
          </button>
          {currentWeek !== getCurrentISOWeek() && (
            <button
              onClick={goToCurrentWeek}
              className="ml-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Current Week
            </button>
          )}
        </div>

        {weeklyData.length === 0 ? (
          <p className="text-white text-center">
            No activity data available for this week.
          </p>
        ) : (
          <>
            {/* Stats Dashboard */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatCard
                icon={<FiActivity />}
                title="Total Workouts"
                value={stats.totalWorkouts}
              />
              <StatCard
                icon={<FiTrendingUp />}
                title="Total Calories"
                value={`${stats.totalCalories} kcal`}
              />
              <StatCard
                icon={<CiTimer />}
                title="Avg Duration"
                value={`${stats.avgDuration} mins`}
              />
              <StatCard
                icon={<CiDumbbell />}
                title="Total Distance"
                value={`${stats.totalDistance} km`}
              />
            </div>

            {/* Daily Logs */}
            {weeklyData?.map((dayData, dayIndex) => (
              <DailyLog key={dayIndex} dayData={dayData} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value }) => (
  <div className="bg-gray-900 rounded-lg p-6 border border-red-900">
    <div className="flex items-center gap-2 text-red-500 mb-2">
      {icon}
      <h3 className="text-lg font-semibold">{title}</h3>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
  </div>
);

const DailyLog = ({ dayData }) => (
  <div className="mb-8 bg-gray-900 rounded-lg overflow-hidden border border-red-900">
    <div className="bg-red-900 p-4">
      <h2 className="text-xl font-bold text-white">{dayData.day}</h2>
    </div>
    <div className="p-4">
      {dayData.exercises.map((exercise, exerciseIndex) => (
        <div
          key={exerciseIndex}
          className="mb-4 bg-gray-800 p-4 rounded-lg border border-red-800"
        >
          <div className="flex justify-between items-start">
            <h3 className="text-lg font-semibold text-white">{exercise.name}</h3>
            <button className="text-red-500 hover:text-red-400">
              <FiX size={20} />
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-300">
            {exercise.times && (
              <p>
                <strong>Duration:</strong> {exercise.times}
              </p>
            )}
            {exercise.calories_gain && (
              <p>
                <strong>Calories:</strong> {exercise.calories_gain} kcal
              </p>
            )}
            {exercise.category && (
              <p>
                <strong>Category:</strong> {exercise.category}
              </p>
            )}
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default WorkoutDashboard;
