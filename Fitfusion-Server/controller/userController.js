const { getDatabase } = require("../config/db")
const { ObjectId } = require("mongodb")

const getUser = async (req, res) => {
    const db = getDatabase()
    const userCollection = db.collection('fitFusionUser')
    const userData = await userCollection.find().toArray()
    res.send(userData)
}
const postUser = async (req, res) => {
    const db = getDatabase();
    const userCollection = db.collection('fitFusionUser');
    const userData = req.body;
    const result = await userCollection.insertOne(userData);
    return result;
};

const getUserByEmail = async (req, res) => {
    const db = getDatabase();
    const userCollections = db.collection('fitFusionUser');
    const userEmail = req.params.email;
    const userData = await userCollections.findOne({ email: userEmail });
    res.send(userData);
};
const updateUser = async (req, res) => {

    const db = getDatabase();
    const userCollection = db.collection('fitFusionUser');
    const userEmail = req.params.email;
    const updatedData = req.body;
    const result = await userCollection.updateOne(
        { email: userEmail }, 
        { $set: updatedData } 
    );
    delete updatedData._id;
    if (result.modifiedCount > 0) {
        res.status(200).send({ message: "User profile updated successfully" });
    } else {
        res.status(404).send({ message: "User not found or no changes made" });
    }
};


module.exports = {
    getUser,
    getUserByEmail,
    postUser,
    updateUser
};