const express = require('express');
const router = express.Router();
const {
    getNutrition,
    saveDailyNutrition,
    saveMealData,
    getFitnessDataByWeek
} = require('../controller/nutritionController');

// Get nutrition data for a user
router.get('/nutration/:email', getNutrition);
router.get('/week/:weekNumber', getFitnessDataByWeek);

// Save daily nutrition data
router.post('/daily', saveDailyNutrition);

// Add and remove meals
// router.post('/meal', addMeal);
router.post('/meals', saveMealData);



module.exports = router;