const express = require('express')
const cors = require('cors')
require('dotenv').config()
const port = process.env.PORT || 9000
const app = express()
const { connectToDatabase } = require('./config/db');
const userRoute = require('./routes/userRoute');
const workOutRoute = require('./routes/workOutRoute');
const nutritionRoutes = require('./routes/nutritionRoutes');

app.use(cors())
app.use(express.json())

connectToDatabase()
app.use('/', userRoute,workOutRoute,nutritionRoutes)
app.get('/', (req, res) => {
    res.send('server is running')
})

app.listen(port, () => {
    console.log(`the server is running on ${port}`);
})
