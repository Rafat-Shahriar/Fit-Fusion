import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  FaChevronDown,
  FaPlus,
  FaSave,
  FaSearch,
  FaStar,
  FaTrash,
  FaUtensils,
  FaCalendar,
} from 'react-icons/fa';
import useAuth from '../../Hooks/useAuth';

const commonFoods = {
  'Chicken Breast': { calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  'Brown Rice': { calories: 216, protein: 5, carbs: 45, fat: 1.8 },
  Salmon: { calories: 208, protein: 22, carbs: 0, fat: 13 },
  Broccoli: { calories: 55, protein: 3.7, carbs: 11.2, fat: 0.6 },
  Banana: { calories: 105, protein: 1.3, carbs: 27, fat: 0.3 },
  'Greek Yogurt': { calories: 130, protein: 12, carbs: 9, fat: 4 },
  'Sweet Potato': { calories: 103, protein: 2, carbs: 24, fat: 0.2 },
  'Quinoa': { calories: 120, protein: 4.4, carbs: 21.3, fat: 1.9 },
  'Almonds': { calories: 164, protein: 6, carbs: 6, fat: 14 },
  'Eggs': { calories: 72, protein: 6.3, carbs: 0.4, fat: 4.8 },
};

const NutritionTracker = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [dailyGoal, setDailyGoal] = useState(1000);
  const [meals, setMeals] = useState({
    Sun: { name: [], calories: [], protein: [], carbs: [], fat: [], totalCal: 0, saved: false, isEdited: false },
    Mon: { name: [], calories: [], protein: [], carbs: [], fat: [], totalCal: 0, saved: false, isEdited: false },
    Tue: { name: [], calories: [], protein: [], carbs: [], fat: [], totalCal: 0, saved: false, isEdited: false },
    Wed: { name: [], calories: [], protein: [], carbs: [], fat: [], totalCal: 0, saved: false, isEdited: false },
    Thu: { name: [], calories: [], protein: [], carbs: [], fat: [], totalCal: 0, saved: false, isEdited: false },
    Fri: { name: [], calories: [], protein: [], carbs: [], fat: [], totalCal: 0, saved: false, isEdited: false },
    Sat: { name: [], calories: [], protein: [], carbs: [], fat: [], totalCal: 0, saved: false, isEdited: false },
  });

  const [weeklyData, setWeeklyData] = useState({
    Sun: { totalCal: 0, meals: null },
    Mon: { totalCal: 0, meals: null },
    Tue: { totalCal: 0, meals: null },
    Wed: { totalCal: 0, meals: null },
    Thu: { totalCal: 0, meals: null },
    Fri: { totalCal: 0, meals: null },
    Sat: { totalCal: 0, meals: null },
  });

  const [favorites, setFavorites] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const todayIndex = new Date().getDay();
  const [selectedDay, setSelectedDay] = useState(todayIndex);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);
  const getData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/nutration/${user?.email}`);
      console.log('API Response:', response.data);

      const newWeeklyData = {
        Sun: { totalCal: 0, meals: null },
        Mon: { totalCal: 0, meals: null },
        Tue: { totalCal: 0, meals: null },
        Wed: { totalCal: 0, meals: null },
        Thu: { totalCal: 0, meals: null },
        Fri: { totalCal: 0, meals: null },
        Sat: { totalCal: 0, meals: null },
      };

      const weeklyMeals = Array.isArray(response.data) ? response.data : [response.data];
      const currentWeekNumber = getWeekNumber(new Date());

      weeklyMeals.forEach(dayData => {
        if (dayData && dayData.weekNumber === currentWeekNumber) {
          if (dayData.day && newWeeklyData[dayData.day]) {
            newWeeklyData[dayData.day] = {
              totalCal: dayData.totalCal || 0,
              meals: dayData.meals || {
                name: [],
                calories: [],
                protein: [],
                carbs: [],
                fat: [],
                totalCal: 0,
                isEdited: false
              }
            };
          }
        }
      });

      setWeeklyData(newWeeklyData);

      const currentDayData = newWeeklyData[days[selectedDay]];
      if (currentDayData.meals) {
        setMeals(prevMeals => ({
          ...prevMeals,
          [days[selectedDay]]: {
            ...currentDayData.meals,
            isEdited: false
          }
        }));
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Failed to load nutrition data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const getWeekNumber = (date) => {
    const startDate = new Date(date.getFullYear(), 0, 1);
    const diff = date - startDate;
    const oneDay = 1000 * 60 * 60 * 24;
    const days = Math.floor(diff / oneDay);
    return Math.ceil((days + 1) / 7);
  };


  const saveDaily = async () => {
    setLoading(true);
    setError(null);
    try {
      const totalCal = meals[days[selectedDay]].calories.reduce((sum, cal) => sum + cal, 0);

      const newMeals = { ...meals };
      newMeals[days[selectedDay]] = {
        ...newMeals[days[selectedDay]],
        totalCal,
        saved: true,
        isEdited: false
      };

      setMeals(newMeals);

      const newWeeklyData = { ...weeklyData };
      newWeeklyData[days[selectedDay]] = {
        totalCal,
        meals: newMeals[days[selectedDay]]
      };
      setWeeklyData(newWeeklyData);

      const currentDate = new Date();
      const weekNumber = getWeekNumber(currentDate);

      const mealData = {
        email: user.email,
        name: user.name,
        day: days[selectedDay],
        totalCal,
        meals: newMeals[days[selectedDay]],
        weekNumber,
      };
      // console.log(mealData);
      

      await axios.post(`${import.meta.env.VITE_API_URL}/meals`, mealData);
    } catch (error) {
      console.error("Error saving data:", error.response ? error.response.data : error.message);
      setError("Failed to save nutrition data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };



  const filteredFoods = Object.keys(commonFoods).filter((food) =>
    food.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addMeal = (foodName) => {
    const food = commonFoods[foodName];
    setMeals((prevMeals) => ({
      ...prevMeals,
      [days[selectedDay]]: {
        ...prevMeals[days[selectedDay]],
        name: [...prevMeals[days[selectedDay]].name, foodName],
        calories: [...prevMeals[days[selectedDay]].calories, food.calories],
        protein: [...prevMeals[days[selectedDay]].protein, food.protein],
        carbs: [...prevMeals[days[selectedDay]].carbs, food.carbs],
        fat: [...prevMeals[days[selectedDay]].fat, food.fat],
        saved: false,
        isEdited: true
      },
    }));
    setShowSearch(false);
    setSearchTerm('');
  };

  const toggleFavorite = (foodName) => {
    setFavorites(prevFavorites =>
      prevFavorites.includes(foodName)
        ? prevFavorites.filter(f => f !== foodName)
        : [...prevFavorites, foodName]
    );
  };

  const removeMeal = (index) => {
    setMeals((prevMeals) => ({
      ...prevMeals,
      [days[selectedDay]]: {
        ...prevMeals[days[selectedDay]],
        name: prevMeals[days[selectedDay]].name.filter((_, i) => i !== index),
        calories: prevMeals[days[selectedDay]].calories.filter((_, i) => i !== index),
        protein: prevMeals[days[selectedDay]].protein.filter((_, i) => i !== index),
        carbs: prevMeals[days[selectedDay]].carbs.filter((_, i) => i !== index),
        fat: prevMeals[days[selectedDay]].fat.filter((_, i) => i !== index),
        saved: false,
        isEdited: true
      },
    }));
  };

  const isSaveButtonDisabled = () => {
    return loading ||
      totals.calories < 1000 ||
      meals[days[selectedDay]].saved ||
      meals[days[selectedDay]].name.length === 0 ||
      !meals[days[selectedDay]].isEdited;
  };

  const getSaveButtonText = () => {
    if (loading) return 'Saving...';
    if (meals[days[selectedDay]].saved) return 'Day Saved';
    if (meals[days[selectedDay]].name.length === 0) return 'Add Meals First';
    if (totals.calories < 1000) return 'Need 1000+ kcal';
    if (!meals[days[selectedDay]].isEdited) return 'No Changes';
    return 'Save Day';
  };

  const totals = {
    calories: meals[days[selectedDay]].calories.reduce((sum, cal) => sum + cal, 0),
    protein: meals[days[selectedDay]].protein.reduce((sum, pro) => sum + pro, 0),
    carbs: meals[days[selectedDay]].carbs.reduce((sum, carb) => sum + carb, 0),
    fat: meals[days[selectedDay]].fat.reduce((sum, f) => sum + f, 0),
  };

  const getProgressColor = (calories) => {
    const percentage = (calories / dailyGoal) * 100;
    if (percentage < 75) return 'bg-green-500';
    if (percentage < 90) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  return (
    <div className="min-h-screen bg-black p-2 sm:p-4 md:p-6">
      <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-900 to-red-700 rounded-lg p-4 sm:p-6 shadow-lg">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3">
              <FaUtensils className="text-white w-6 h-6 sm:w-8 sm:h-8" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Nutrition Tracker</h1>
            </div>
            <div className="flex items-center space-x-3 w-full sm:w-auto">
              <span className="text-white text-sm sm:text-base">Daily Goal:</span>
              <input
                type="number"
                value={dailyGoal}
                onChange={(e) => setDailyGoal(Number(e.target.value))}
                className="w-24 px-3 py-2 rounded bg-black text-white border border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500"
              />
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-900 text-white p-4 rounded-lg text-sm sm:text-base">
            {error}
          </div>
        )}

        {/* Daily Tracking Section */}
        <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-red-500">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0 mb-6">
            <div className="flex items-center space-x-3">
              <FaCalendar className="text-red-500 w-5 h-5 sm:w-6 sm:h-6" />
              <h2 className="text-xl sm:text-2xl font-bold text-white">{days[selectedDay]} Tracking</h2>
            </div>
            <button
              onClick={saveDaily}
              disabled={isSaveButtonDisabled()}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors duration-200 w-full sm:w-auto justify-center sm:justify-start
                ${isSaveButtonDisabled()
                  ? 'bg-gray-600 cursor-not-allowed opacity-50'
                  : 'bg-red-500 hover:bg-red-600'} text-white`}
            >
              <FaSave className="w-5 h-5" />
              <span>{getSaveButtonText()}</span>
            </button>
          </div>

          {/* Food Search */}
          <div className="relative mb-6">
            <button
              onClick={() => setShowSearch(!showSearch)}
              className="w-full flex items-center justify-between px-4 py-3 bg-black text-white rounded-lg hover:bg-gray-800 border border-red-500 transition-colors duration-200"
            >
              <span>Add Food</span>
              <FaChevronDown className={`w-5 h-5 transition-transform duration-200 ${showSearch ? 'transform rotate-180' : ''}`} />
            </button>

            {showSearch && (
              <div className="absolute w-full mt-2 bg-black rounded-lg shadow-xl z-10 border border-red-500">
                <div className="p-3 flex items-center border-b border-red-500">
                  <FaSearch className="w-5 h-5 text-red-500 mr-3" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search foods..."
                    className="w-full bg-transparent text-white outline-none placeholder-gray-500 text-sm sm:text-base"
                  />
                </div>
                <div className="max-h-48 sm:max-h-60 overflow-y-auto">
                  {filteredFoods.map(food => (
                    <div
                      key={food}
                      className="flex items-center justify-between p-3 hover:bg-gray-800 cursor-pointer transition-colors duration-200"
                      onClick={() => addMeal(food)}
                    >
                      <span className="text-white text-sm sm:text-base">{food}</span>
                      <div className="flex items-center space-x-3">
                        <span className="text-red-500 text-sm sm:text-base">{commonFoods[food].calories} cal</span>
                        <FaStar
                          className={`w-4 h-4 sm:w-5 sm:h-5 cursor-pointer ${favorites.includes(food) ? 'text-yellow-400' : 'text-gray-600'}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleFavorite(food);
                          }}
                        />
                        <FaPlus className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Meal List */}
          <div className="space-y-4">
            {meals[days[selectedDay]].name.map((meal, index) => (
              <div key={index} className="flex justify-between items-center p-3 bg-black rounded-lg border border-red-500">
                <span className="text-white text-sm sm:text-base">{meal}</span>
                <div className="flex items-center space-x-3">
                  <span className="text-red-500 text-sm sm:text-base">{meals[days[selectedDay]].calories[index]} cal</span>
                  <button
                    onClick={() => removeMeal(index)}
                    className="text-red-500 hover:text-red-400 transition-colors duration-200"
                  >
                    <FaTrash className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Daily Totals */}
          <div className="mt-6 p-4 bg-black rounded-lg border border-red-500">
            <h3 className="text-lg font-semibold text-white mb-4">Total for Today</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Calories Card */}
              <div className="bg-gray-900 p-3 rounded-lg">
                <div className="text-gray-400 text-sm">Calories</div>
                <div className="text-red-500 text-lg sm:text-xl font-bold">{totals.calories}</div>
                <div className="text-xs sm:text-sm text-gray-400">
                  {Math.round((totals.calories / dailyGoal) * 100)}% of goal
                </div>
                <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${getProgressColor(totals.calories)} transition-all duration-300`}
                    style={{ width: `${Math.min((totals.calories / dailyGoal) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>

              {/* Macronutrient Cards */}
              <div className="bg-gray-900 p-3 rounded-lg">
                <div className="text-gray-400 text-sm">Protein</div>
                <div className="text-blue-500 text-lg sm:text-xl font-bold">{totals.protein}g</div>
              </div>
              <div className="bg-gray-900 p-3 rounded-lg">
                <div className="text-gray-400 text-sm">Carbs</div>
                <div className="text-green-500 text-lg sm:text-xl font-bold">{totals.carbs}g</div>
              </div>
              <div className="bg-gray-900 p-3 rounded-lg">
                <div className="text-gray-400 text-sm">Fat</div>
                <div className="text-yellow-500 text-lg sm:text-xl font-bold">{totals.fat}g</div>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Summary */}
        <div className="bg-gray-900 rounded-lg p-4 sm:p-6 border border-red-500">
          <div className="text-white">
            <h3 className="text-xl sm:text-2xl font-bold mb-4">Weekly Summary</h3>
            <div className="grid grid-cols-1 sm:grid-cols-7 gap-2 sm:gap-4">
              {days.map((day, index) => (
                <div
                  key={day}
                  onClick={() => setSelectedDay(index)}
                  className={`text-center p-2 sm:p-3 rounded cursor-pointer transition-colors duration-200
            ${selectedDay === index ? 'bg-red-900 bg-opacity-50' : 'hover:bg-gray-800'}
            ${weeklyData[day].totalCal > dailyGoal ? 'border-2 border-yellow-500' : ''}`}
                >
                  <span className="block mb-1 sm:mb-2 text-xs sm:text-base">{day}</span>
                  <div className="text-red-500 font-bold text-xs sm:text-base">
                    {weeklyData[day].totalCal} cal
                  </div>
                  {weeklyData[day].totalCal > 0 && (
                    <div className="text-xs text-gray-400 mt-1 hidden sm:block">
                      {Math.round((weeklyData[day].totalCal / dailyGoal) * 100)}%
                    </div>
                  )}
                  <div className="mt-1 sm:mt-2 h-1 bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor(weeklyData[day].totalCal)} transition-all duration-300`}
                      style={{ width: `${Math.min((weeklyData[day].totalCal / dailyGoal) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Weekly Stats */}
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-black p-4 rounded-lg border border-red-500">
                <div className="text-gray-400 text-sm">Weekly Average</div>
                <div className="text-lg sm:text-xl font-bold text-red-500">
                  {Math.round(
                    Object.values(weeklyData).reduce((sum, day) => sum + day.totalCal, 0) / 7
                  )} cal/day
                </div>
              </div>
              <div className="bg-black p-4 rounded-lg border border-red-500">
                <div className="text-gray-400 text-sm">Highest Day</div>
                <div className="text-lg sm:text-xl font-bold text-red-500">
                  {Math.max(...Object.values(weeklyData).map(day => day.totalCal))} cal
                </div>
              </div>
              <div className="bg-black p-4 rounded-lg border border-red-500">
                <div className="text-gray-400 text-sm">Days On Target</div>
                <div className="text-lg sm:text-xl font-bold text-red-500">
                  {Object.values(weeklyData).filter(day =>
                    day.totalCal >= dailyGoal * 0.9 && day.totalCal <= dailyGoal * 1.1
                  ).length} / 7
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NutritionTracker;