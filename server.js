const express = require('express');
const app = express();
const methodOverride = require('method-override');
const ejs = require('ejs');
require("dotenv").config();
//Import the mongoose module
const mongoose = require('mongoose');
// import model
const Car = require('./models/carSchema');
const Make = require('./models/makeSchema');
//Set up default mongoose connection
const mongoDB = 'mongodb://127.0.0.1/cars';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
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
app.use(express.static('public'))
// override with POST having ?_method=DELETE
app.use(methodOverride('_method'))

// settings for views
app.set('view engine', 'ejs');
app.engine('html', ejs.renderFile)

//// route
// Login Routes as index
// app.use('/', loginIndex);

app.get('/', (req, res) => {
    res.render('index');
})

// CARS APIS
app.get('/cars/filter', async(req, res) =>{
    let { status, price, make, model, distance, order } = req.query;
    let query = {};
    console.log(req.query);
    if (status != null) status != 'newandused' ? query.status = status: null;
    if (price != null) price != 'all' ? (parseInt(price) > 50000) ? query.price = { $gt: parseInt(price) }: query.price = { $lt: parseInt(price) }: null;
    if (make != null) make != 'all' ? query.make = make: null;
    if (model != null) model != 'all' ? query.model = model: null;
    if (distance != null) distance != 'all' ? (parseInt(distance) > 100000) ? query.distance = { $gt: parseInt(distance) }: query.distance = { $lt: parseInt(distance) }: null;

    console.log(query);
    let cars = {};
    // if(order != null){
    //     console.log('inside order')
    //     order == 'asc' ? cars = await Car.find(query).sort({price:1}):cars = await Car.find(query).sort({price:-1});
    // } else {
    //     cars = await Car.find(query);
    // }
    cars = await Car.find(query);
    const makes = await Make.find({});
    console.log(cars);
    res.send(cars);
})
// GET /cars - Display all cars
app.get('/cars', async (req, res) => {
    // using async because when using Car.find({}) it will take time
    // to go through all the data in collection and we don't want our 
    // request to wait for it
    let { status, price, make, model, distance, order } = req.query;
    let query = {};
    //console.log(req.query);
    if (status != null) status != 'newandused' ? query.status = status: null;
    if (price != null) price != 'all' ? (parseInt(price) > 50000) ? query.price = { $gt: parseInt(price) }: query.price = { $lt: parseInt(price) }: null;
    if (make != null) make != 'all' ? query.make = make: null;
    if (model != null) model != 'all' ? query.model = model: null;
    if (distance != null) distance != 'all' ? (parseInt(distance) > 100000) ? query.distance = { $gt: parseInt(distance) }: query.distance = { $lt: parseInt(distance) }: null;

    //console.log(query);
    let cars = {};
    if(order != null){
        
        order == 'asc' ? cars = await Car.find(query).sort({price:1}):cars = await Car.find(query).sort({price:-1});
    } else {
        cars = await Car.find(query);
    }
    const makes = await Make.find({});
 
    res.render('cars/index', { cars, makes })
})

// GET /cars/new - From to create new car
app.get('/cars/new', async (req, res) => {
    const makes = await Make.find({});
    console.log(makes);

    res.render('cars/new', { makes });
})

// POST /cars - create new car on server
app.post('/cars', async (req, res) => {

    const { title, status, year, distance, price, make, model, bodyStyle, sellersNote } = req.body;

    const car = new Car({
        title: title,
        status: status,
        year: parseInt(year),
        make: make,
        distance: distance,
        model: model,
        price: parseInt(price),
        bodyStyle: bodyStyle,
        sellersNote: sellersNote
    })
    await car.save();
    res.redirect('/cars')
})
// GET /cars/:id - Details for one specific car

// GET /cars/:id/edit - Form to edit a car
app.get('/cars/:id/edit', async (req, res) => {
    const { id } = req.params;
    const makes = await Make.find({});
    const car = await Car.findById(id);
    console.log(car);
    res.render('cars/edit', { car, makes })
})

// PUT /cars/:id - Update specific car on server
app.put('/cars/:id', async (req, res) => {
    const { id } = req.params;
    const { title, status, year, distance, price, make, model, bodyStyle, sellersNote } = req.body;
    const car = await Car.findByIdAndUpdate(id, {
        title: title,
        status: status,
        year: parseInt(year),
        make: make,
        distance: distance,
        model: model,
        price: parseInt(price),
        bodyStyle: bodyStyle,
        sellersNote: sellersNote
    })
    res.redirect('/cars');
})

// DELETE /cars/:id - Delete specific car on server
app.delete('/cars/:id', async (req, res) => {
    const { id } = req.params;
    await Car.findByIdAndDelete(id);
    res.redirect('/cars');
})

// Makes CRUD
// GET /makes - Display all makes
app.get('/makes', async (req, res) => {
    const makes = await Make.find({});
    res.render('makes/index', { makes });
})

// GET /api/makes - Display all makes
app.get('/api/makes', async (req, res) => {
    const makes = await Make.find({});
    res.send(makes);
})

// GET /makes/new - From to create new make
app.get('/makes/new', (req, res) => {
    res.render('makes/new');
})

// POST /makes - create new make on server
app.post('/makes', async (req, res) => {
    console.log(req.body);
    const { name, model1, model2, model3, model4 } = req.body;
    const make = new Make({
        name: name,
        models: [model1, model2, model3, model4]
    });
    await make.save();
    res.redirect('/makes');
})

// GET /makes/:id - Details for one specific make
app.get('/makes/:id', async (req, res) => {
    const { id } = req.params;
    const make = await Make.findById(id);
    res.render('makes/show', { make })
})

// GET /makes/:id/edit - Form to edit a make
app.get('/makes/:id/edit', async (req, res) => {
    const { id } = req.params;
    const make = await Make.findById(id);
    res.render('makes/edit', { make })
})

// PUT /makes/:id - Update specific make on server
app.put('/makes/:id', async (req, res) => {
    console.log(req.body);
    const { id } = req.params;
    const { name, model1, model2, model3, model4 } = req.body;
    const make = await Make.findByIdAndUpdate(id, {
        name: name,
        models: [model1, model2, model3, model4]
    }, { runValidators: true, new: true });
    res.redirect(`/makes/${make._id}`)
})

// DELETE /makes/:id - Delete specific make on server
app.delete('/makes/:id', async (req, res) => {
    const { id } = req.params;
    await Make.findByIdAndDelete(id);
    res.redirect('/makes');
})


// port
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => { console.log('App running on ' + process.env.PORT) });