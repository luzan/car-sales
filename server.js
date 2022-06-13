const express = require('express');
const app = express();
const ejs = require('ejs');
require("dotenv").config();
//Import the mongoose module
const mongoose = require('mongoose');

const PORT = process.env.PORT || 3000;
// importing controllers
const { loginIndex } = require('./controllers/loginController');

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/cars';
mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// settings for views
app.set('view engine', 'html');
app.engine('html', ejs.renderFile)

//// route
// Login Routes as index
app.use('/', loginIndex);

// port
app.listen(PORT, () => { console.log('App running on ' + process.env.PORT)});