const { getDatabase } = require("../config/db");
const { ObjectId } = require("mongodb");


const getWorkData = async (req, res) => {
    const db = getDatabase();
    const userCollections = db.collection('fitFusionWorkout');
    const userEmail = req.params.email;
    const userData = await userCollections.findOne({ email: userEmail });
    res.send(userData);
};

const getallWorkdata = async (req, res) => {
    const db = getDatabase();
    const userCollections = db.collection('fitFusionWorkout');
    const userEmail = req.params.email;
    const userData = await userCollections.find({ email: userEmail }).toArray();
    res.send(userData);
};

const getWorkdataemail = async (req, res) => {
    const db = getDatabase();
        const userCollections = db.collection('fitFusionWorkout');
        const userEmail = req.params.email;
        const currentWeek = parseInt(req.query.weekNumber); 
        console.log(currentWeek,userEmail);
        
        const userData = await userCollections.find({ 
            email: userEmail, 
            weekNumber: currentWeek 
        }).toArray();
        console.log(userData);
        

        res.send(userData);
};

const completeWorkout = async (req, res) => {
    const db = getDatabase();
    const workoutCollection = db.collection('fitFusionWorkout');
    const userEmail = req.params.email;
    const updatedData = req.body;

    try {
        // Remove _id from updatedData if it exists
        const { _id, ...dataToUpdate } = updatedData;

        const result = await workoutCollection.updateOne(
            { email: userEmail },
            { $set: dataToUpdate }
        );

        if (result.modifiedCount > 0) {
            res.status(200).send({ message: "Workout status updated successfully" });
        } else {
            res.status(404).send({ message: "Workout not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating workout status:", error);
        res.status(500).send({ message: "An error occurred while updating the workout status" });
    }
};

const saveWorkData = async (req, res) => {
    const workOutData = req.body;
    const db = getDatabase();
    const workOutCollection = db.collection('fitFusionWorkout');
    
    try {
        // Check if workout data already exists for this user and day
        const existingWorkout = await workOutCollection.findOne({ 
            email: workOutData.email,
            day: workOutData.day
        });

        if (existingWorkout) {
            // If exists, update it
            const { _id, ...dataToUpdate } = workOutData;
            const result = await workOutCollection.updateOne(
                { email: workOutData.email, day: workOutData.day },
                { $set: dataToUpdate }
            );
            res.status(200).send({ message: 'Workout data updated successfully', result });
        } else {
            // If doesn't exist, create new
            const result = await workOutCollection.insertOne(workOutData);
            res.status(201).send({ message: 'Workout data saved successfully', result });
        }
    } catch (error) {
        console.error("Error saving workout data:", error);
        res.status(500).send({ message: "An error occurred while saving the workout data" });
    }
};



module.exports = {
    getWorkData,
    getallWorkdata,
    getWorkdataemail,
    saveWorkData,
    completeWorkout
};