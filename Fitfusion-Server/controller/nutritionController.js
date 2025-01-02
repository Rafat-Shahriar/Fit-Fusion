const { getDatabase } = require("../config/db");
const { ObjectId } = require("mongodb");

// Get all nutrition records for a user
const getNutrition = async (req, res) => {
    const db = getDatabase();
    const userCollections = db.collection('fitFusionNutrition');
    const userEmail = req.params.email;
    const userData = await userCollections.find({ email: userEmail }).toArray();
    res.status(200).send(userData);
};
const getFitnessDataByWeek = async (req, res) => {
    const { weekNumber } = req.params;
    const db = getDatabase();
    const fitnessData = db.collection('fitFusionNutrition');
    const data = await fitnessData.find({ weekNumber: parseInt(weekNumber) }).toArray();
    console.log(data);

    if (data.length === 0) {
        return res.status(404).json({ message: 'No data found for the given week number.' });
    }
    res.status(200).json(data);
};

const saveMealData = async (req, res) => {
    const mealData = req.body;
    const db = getDatabase();
    const mealsCollection = db.collection('fitFusionNutrition');
    const result = await mealsCollection.insertOne(mealData);
    res.status(201).send({ message: 'Meal data saved successfully', result });

};

const saveDailyNutrition = async (req, res) => {
    try {
        const db = getDatabase();
        const nutritionCollection = db.collection('fitFusionNutrition');
        const { userEmail, day, date, meals, totals } = req.body;

        const result = await nutritionCollection.updateOne(
            { userEmail },
            {
                $set: {
                    [`weeklyData.${day}`]: totals.calories,
                    lastUpdated: new Date(),
                    dailyGoal: req.body.dailyGoal || 2000
                },
                $push: {
                    mealHistory: {
                        date,
                        meals,
                        totals
                    }
                }
            },
            { upsert: true }
        );

        res.status(200).send({
            message: "Nutrition data saved successfully",
            modifiedCount: result.modifiedCount
        });
    } catch (error) {
        res.status(500).send({ message: "Error saving nutrition data", error: error.message });
    }
};



module.exports = {
    getNutrition,
    saveDailyNutrition,
    saveMealData,
    getFitnessDataByWeek
};