const express = require('express');
const app = express();
const ejs = require('ejs');
require("dotenv").config();
//Import the mongoose module
const mongoose = require('mongoose');
// import model
const Car = require('./models/carSchema')
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/cars';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    console.log("MongoDB Connected!");
})
.catch((err) => {
    console.log("MongoDB Connection Error!!");
    console.log(err);
});

// importing controllers
const { loginIndex } = require('./controllers/loginController');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// settings for views
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile)

//// route
// Login Routes as index
// app.use('/', loginIndex);

app.get('/', (req, res)=> {
    res.render('index');
})

// CARS APIS

app.get('/cars', async (req, res) => {
    // using async because when using Car.find({}) it will take time
    // to go through all the data in collection and we don't want our 
    // request to wait for it
    const cars = await Car.find({});
    console.log(cars);
    res.render('cars/index', { cars })
})

app.get('/cars/new', async (req, res) => {
    res.render('cars/new');
})

app.get('/cars/:id', async (req, res) => {
    const { id } = req.params;
    const car = await Car.findById(id);
    res.send('edit page');
})

// port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('App running on ' + process.env.PORT)});