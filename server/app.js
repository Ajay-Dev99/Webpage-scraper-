const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const morgan = require('morgan')
require('dotenv').config()

const userRoutes = require("./routes/userRoutes")

const app = express();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB connection successful");
    })
    .catch((err) => {
        console.error("Error connecting to MongoDB Atlas:", err);
    });


app.use(express.json())
app.use(morgan('dev'))
app.use(cors({
    origin: true,
    credentials: true
}))



app.use("/",userRoutes)


app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
    next(error)
})

app.use((err, req, res, next) => {
    if (err) {
        res.status(err.status || 500).json({ message: err.message || "Internal Server Error"});
    } 
  });

app.listen(process.env.PORT, (error) => {
    if (error) {
        console.log('error', error.message);
    } else {
        console.log(`Server Starts on Port ${process.env.PORT}`);
    }
})