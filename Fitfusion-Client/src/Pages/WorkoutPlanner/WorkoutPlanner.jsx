import { useState, useEffect } from 'react';
import ExerciseModal from './ExerciseModal';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import { FaCalendar, FaPlus, FaCheck, FaChartBar } from 'react-icons/fa';

const WorkoutPlanner = () => {
  const { user } = useAuth();
  const exerciseData = {
    "exercise_categories": [
      {
        "category": "Cardio",
        "exercises": [
          { "name": "Running", "times": "30 minutes", "calories_gain": "300" },
          { "name": "Cycling", "times": "45 minutes", "calories_gain": "400" },
          { "name": "Jumping Rope", "times": "20 minutes", "calories_gain": "250" }
        ]
      },
      {
        "category": "Strength Training",
        "exercises": [
          { "name": "Push-Ups", "times": "15 reps", "calories_gain": "50" },
          { "name": "Squats", "times": "20 reps", "calories_gain": "70" },
          { "name": "Deadlifts", "times": "10 reps", "calories_gain": "100" }
        ]
      },
      {
        "category": "Flexibility",
        "exercises": [
          { "name": "Yoga", "times": "30 minutes", "calories_gain": "150" },
          { "name": "Stretching", "times": "15 minutes", "calories_gain": "50" },
          { "name": "Pilates", "times": "30 minutes", "calories_gain": "180" }
        ]
      }
    ]
  };

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayIndex = new Date().getDay();
  const DAILY_GOAL = 500;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const [weeklyData, setWeeklyData] = useState({
    Sun: { exercises: [], totalCalories: 0, isCompleted: false },
    Mon: { exercises: [], totalCalories: 0, isCompleted: false },
    Tue: { exercises: [], totalCalories: 0, isCompleted: false },
    Wed: { exercises: [], totalCalories: 0, isCompleted: false },
    Thu: { exercises: [], totalCalories: 0, isCompleted: false },
    Fri: { exercises: [], totalCalories: 0, isCompleted: false },
    Sat: { exercises: [], totalCalories: 0, isCompleted: false }
  });

  const getWeekNumber = (date) => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const diff = date - startDate;
    const oneDay = 1000 * 60 * 60 * 24;
    const days = Math.floor(diff / oneDay);
    return Math.ceil((days + 1) / 7);
  };

  useEffect(() => {
    if (user) {
      fetchWeeklyData();
    }
  }, [user]);

  const fetchWeeklyData = async () => {
    if (!user?.email) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/allWorkout/${user.email}`);
      const workouts = Array.isArray(response.data) ? response.data : [response.data];
      const currentWeekNumber = getWeekNumber(new Date());
      console.log(response,workouts,currentWeekNumber);
      
      const newWeeklyData = { ...weeklyData };

      workouts.forEach(workout => {
        if (workout && workout.weekNumber === currentWeekNumber) {
          if (workout.day && newWeeklyData[workout.day]) {
            newWeeklyData[workout.day] = {
              exercises: workout.exercises || [],
              totalCalories: workout.totalCalories || 0,
              isCompleted: workout.isCompleted || false
            };
          }
        }
      });

      setWeeklyData(newWeeklyData);
    } catch (err) {
      console.error('Error fetching workout data:', err);
      setError('Failed to load workout data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveExercise = async (exercises) => {
    try {
      const totalNewCalories = exercises.reduce((sum, ex) => sum + parseInt(ex.calories_gain), 0);
      const currentDay = days[selectedDay];

      const updatedDayData = {
        ...weeklyData[currentDay],
        exercises: [...weeklyData[currentDay].exercises, ...exercises],
        totalCalories: weeklyData[currentDay].totalCalories + totalNewCalories,
      };

      const weekNumber = getWeekNumber(new Date());

      const workoutData = {
        email: user.email,
        name: user.name,
        day: currentDay,
        exercises: updatedDayData.exercises,
        totalCalories: updatedDayData.totalCalories,
        isCompleted: updatedDayData.isCompleted,
        weekNumber
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/workOut`, workoutData);

      setWeeklyData(prev => ({
        ...prev,
        [currentDay]: updatedDayData
      }));

      setIsModalOpen(false);
    } catch (err) {
      console.error('Error saving exercises:', err);
      setError('Failed to save exercises');
    }
  };

  const handleCompleteWorkout = async () => {
    try {
      const currentDay = days[selectedDay];
      const updatedDayData = {
        ...weeklyData[currentDay],
        isCompleted: true
      };

      const weekNumber = getWeekNumber(new Date());

      const workoutData = {
        email: user.email,
        name: user.name,
        day: currentDay,
        exercises: updatedDayData.exercises,
        totalCalories: updatedDayData.totalCalories,
        isCompleted: true,
        weekNumber
      };

      await axios.post(`${import.meta.env.VITE_API_URL}/workOut`, workoutData);

      setWeeklyData(prev => ({
        ...prev,
        [currentDay]: updatedDayData
      }));
    } catch (err) {
      console.error('Error completing workout:', err);
      setError('Failed to complete workout');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="text-white">Loading workout data...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black p-6 flex items-center justify-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const currentDayData = weeklyData[days[selectedDay]];
  const isGoalReached = currentDayData.totalCalories >= DAILY_GOAL;
  const progressPercentage = Math.min(100, (currentDayData.totalCalories / DAILY_GOAL) * 100);

  const getProgressColor = (calories) => {
    const percentage = (calories / DAILY_GOAL) * 100;
    if (percentage < 75) return 'bg-green-500';
    if (percentage < 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-black p-4 sm:p-6">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-red-900 to-red-700 rounded-lg p-4 sm:p-6 shadow-lg">
          <div className="flex items-center space-x-3">
            <FaChartBar className="text-white w-6 h-6 sm:w-8 sm:h-8" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-white">Workout Planner</h1>
          </div>
        </div>

        {/* Daily Workout Section */}
        <div className="bg-gray-900 p-4 sm:p-6 rounded-lg border border-red-500">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
            <div className="text-white">
              <h2 className="text-xl sm:text-2xl font-bold flex items-center">
                <FaCalendar className="mr-2" />
                {days[selectedDay]} Workout
              </h2>
              <p className="text-sm sm:text-base text-gray-400">Goal: {DAILY_GOAL} kcal</p>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-4">
              <button
                onClick={handleCompleteWorkout}
                disabled={currentDayData.isCompleted || !isGoalReached}
                className={`px-3 sm:px-4 py-2 rounded-lg flex items-center text-sm sm:text-base ${
                  currentDayData.isCompleted || !isGoalReached
                    ? 'bg-gray-600'
                    : 'bg-green-600 hover:bg-green-700'
                } text-white`}
              >
                <FaCheck className="mr-2" />
                Complete
              </button>
              <button
                onClick={() => setIsModalOpen(true)}
                disabled={currentDayData.isCompleted || isGoalReached}
                className={`px-3 sm:px-4 py-2 rounded-lg flex items-center text-sm sm:text-base ${
                  currentDayData.isCompleted || isGoalReached
                    ? 'bg-gray-600'
                    : 'bg-red-600 hover:bg-red-700'
                } text-white`}
              >
                <FaPlus className="mr-2" />
                Add Exercise
              </button>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-2 bg-gray-600 rounded-full">
              <div
                className={`h-full ${getProgressColor(currentDayData.totalCalories)} rounded-full transition-all duration-300`}
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-xs sm:text-sm text-white">{progressPercentage}% of daily goal</p>
              <p className="text-xs sm:text-sm text-white">{currentDayData.totalCalories} / {DAILY_GOAL} kcal</p>
            </div>
          </div>

          {/* Exercise List */}
          <div className="space-y-3 sm:space-y-4">
            {currentDayData.exercises.length === 0 ? (
              <p className="text-gray-400 text-sm sm:text-base">No exercises added yet.</p>
            ) : (
              currentDayData.exercises.map((exercise, index) => (
                <div key={index} className="flex justify-between items-center bg-gray-800 p-3 sm:p-4 rounded-lg">
                  <div>
                    <h3 className="text-sm sm:text-base text-white">{exercise.name}</h3>
                    <p className="text-xs sm:text-sm text-gray-400">{exercise.times}</p>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-400">{exercise.calories_gain} kcal</p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Weekly Summary Section */}
        <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-red-500">
          <div className="text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Weekly Summary</h3>
            
            {/* Weekly Calendar */}
            <div className="grid grid-cols-3 sm:grid-cols-7 gap-2 sm:gap-4">
              {days.map((day, index) => (
                <div
                  key={day}
                  onClick={() => setSelectedDay(index)}
                  className={`text-center p-2 sm:p-3 rounded cursor-pointer transition-colors duration-200
                    ${selectedDay === index ? 'bg-red-900 bg-opacity-50' : 'hover:bg-gray-800'}
                    ${weeklyData[day].isCompleted ? 'border-2 border-green-500' : ''}`}
                >
                  <span className="block mb-1 sm:mb-2 text-sm sm:text-base text-white">{day}</span>
                  <div className="text-xs sm:text-sm text-red-500 font-bold">
                    {weeklyData[day].totalCalories} cal
                  </div>
                  <div className="mt-1 sm:mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(weeklyData[day].totalCalories)} transition-all duration-300`}
                      style={{ width: `${Math.min((weeklyData[day].totalCalories / DAILY_GOAL) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8">
              {[
                {
                  label: "Weekly Average",
                  value: `${Math.round(
                    Object.values(weeklyData).reduce((sum, day) => sum + day.totalCalories, 0) / 7
                  )} cal/day`
                },
                {
                  label: "Days Completed",
                  value: `${Object.values(weeklyData).filter(day => day.isCompleted).length} / 7`
                },
                {
                  label: "Days On Target",
                  value: `${Object.values(weeklyData).filter(day => day.totalCalories >= DAILY_GOAL).length} / 7`
                }
              ].map((stat, index) => (
                <div key={index} className="bg-gray-900 p-3 sm:p-4 rounded-lg border border-red-500">
                  <div className="text-sm sm:text-base text-gray-400">{stat.label}</div>
                  <div className="text-lg sm:text-xl font-bold text-red-500">{stat.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <ExerciseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveExercise}
        exerciseData={exerciseData}
      />
    </div>
  );
};

export default WorkoutPlanner;