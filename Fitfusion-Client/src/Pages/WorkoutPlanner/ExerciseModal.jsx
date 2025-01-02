import { useState, useEffect } from 'react';

const ExerciseModal = ({ isOpen, onClose, onSave, exerciseData }) => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [categoryCalories, setCategoryCalories] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    // Reset state when modal is opened
    if (isOpen) {
      setSelectedCategory("");
      setSelectedExercises([]);
      setCategoryCalories(0);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const total = selectedExercises.reduce((sum, exercise) => {
      return sum + parseInt(exercise.calories_gain);
    }, 0);
    setCategoryCalories(total);
  }, [selectedExercises]);

  if (!isOpen) return null;

  const handleExerciseToggle = (exercise) => {
    setSelectedExercises((prev) => {
      const exists = prev.find((ex) => ex.name === exercise.name && ex.category === selectedCategory);
      if (exists) {
        return prev.filter((ex) => ex.name !== exercise.name || ex.category !== selectedCategory);
      } else {
        return [...prev, {
          ...exercise,
          category: selectedCategory,
          calories: parseInt(exercise.calories_gain)
        }];
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedExercises.length > 0 && !isSubmitting) {
      try {
        setIsSubmitting(true);
        await onSave(selectedExercises);
        onClose();
      } catch (error) {
        console.error('Error saving exercises:', error);
        // Optionally add error handling UI here
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleClose = () => {
    if (!isSubmitting) {
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 p-4 sm:p-6 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-white">Add Exercises</h2>
            <p className="text-xs sm:text-sm text-gray-400">Total Calories: {categoryCalories} kcal</p>
          </div>
          <button
            onClick={handleClose}
            disabled={isSubmitting}
            className="text-gray-400 hover:text-white text-xl sm:text-2xl"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs sm:text-sm text-gray-200 mb-1">Category</label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full p-2 rounded bg-gray-800 text-sm sm:text-base text-white border border-gray-700 focus:border-red-500"
              required
              disabled={isSubmitting}
            >
              <option value="">Select category</option>
              {exerciseData.exercise_categories.map((cat) => (
                <option key={cat.category} value={cat.category}>{cat.category}</option>
              ))}
            </select>
          </div>

          {selectedCategory && (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs sm:text-sm text-gray-200">Exercises</label>
                <span className="text-xs sm:text-sm text-gray-400">
                  Category Calories: {
                    exerciseData.exercise_categories
                      .find(cat => cat.category === selectedCategory)
                      ?.exercises.reduce((sum, ex) => sum + parseInt(ex.calories_gain), 0)
                  } kcal
                </span>
              </div>
              <div className="space-y-2">
                {exerciseData.exercise_categories
                  .find(cat => cat.category === selectedCategory)?.exercises.map((exercise) => (
                    <div
                      key={exercise.name}
                      onClick={() => !isSubmitting && handleExerciseToggle(exercise)}
                      className={`p-2 sm:p-3 rounded cursor-pointer transition ${isSubmitting ? 'opacity-50 cursor-not-allowed' :
                          selectedExercises.some(ex => ex.name === exercise.name && ex.category === selectedCategory)
                            ? 'bg-red-600'
                            : 'bg-gray-800 hover:bg-gray-700'
                        }`}
                    >
                      <div className="flex justify-between">
                        <span className="text-sm sm:text-base text-white">{exercise.name}</span>
                        <span className="text-xs sm:text-sm text-gray-300">{exercise.calories_gain} kcal</span>
                      </div>
                      <div className="text-xs sm:text-sm text-gray-400">{exercise.times}</div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          <button
            type="submit"
            disabled={selectedExercises.length === 0 || isSubmitting}
            className={`w-full py-2 px-4 rounded text-sm sm:text-base ${isSubmitting ? 'bg-gray-600 cursor-not-allowed' :
                selectedExercises.length > 0 ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-600 cursor-not-allowed'
              } text-white`}
          >
            {isSubmitting ? 'Adding...' : `Add to Workout (${selectedExercises.length} selected)`}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ExerciseModal;