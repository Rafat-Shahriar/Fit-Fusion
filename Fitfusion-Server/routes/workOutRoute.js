const express = require('express');
const router = express.Router();
const {
    saveWorkData,
    getWorkData,
    completeWorkout,
    getallWorkdata,
    getWorkdataemail

} = require('../controller/workOutController');

router.get('/workout/:email', getWorkData);
router.get('/allWorkout/:email', getallWorkdata);
router.get('/allWeakWorkout/:email', getWorkdataemail);
router.post('/workOut', saveWorkData);
router.put('/workout/:email', completeWorkout);



module.exports = router;