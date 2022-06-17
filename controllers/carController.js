
const Car = require('../models/carSchema');
const Make = require('../models/makeSchema');

const getCars = async (req, res) => {
    let { status, price, make, model, distance, order } = req.query;
    let query = {};
    //console.log(req.query);
    if (status != null) status != 'newandused' ? query.status = status : null;
    if (price != null) price != 'all' ? (parseInt(price) > 50000) ? query.price = { $gt: parseInt(price) } : query.price = { $lt: parseInt(price) } : null;
    if (make != null) make != 'all' ? query.make = make : null;
    if (model != null) model != 'all' ? query.model = model : null;
    if (distance != null) distance != 'all' ? (parseInt(distance) > 100000) ? query.distance = { $gt: parseInt(distance) } : query.distance = { $lt: parseInt(distance) } : null;

    //console.log(query);
    let cars = {};
    if (order != null) {

        order == 'asc' ? cars = await Car.find(query).sort({ price: 1 }) : cars = await Car.find(query).sort({ price: -1 });
    } else {
        cars = await Car.find(query);
    }
    const makes = await Make.find({});

    res.render('cars/index', { cars, makes })
}

const newCarForm = async (req, res) => {
    const makes = await Make.find({});
    console.log(makes);

    res.render('cars/new', { makes });
}

const postNewCar = async (req, res) => {

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
}

const editCarForm = async (req, res) => {
    const { id } = req.params;
    const makes = await Make.find({});
    const car = await Car.findById(id);
    console.log(car);
    res.render('cars/edit', { car, makes })
}

const editCarRequest = async (req, res) => {
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
}

const deleteCar =async (req, res) => {
    const { id } = req.params;
    await Car.findByIdAndDelete(id);
    res.redirect('/cars');
}


module.exports = {
    getCars,
    newCarForm,
    postNewCar,
    editCarForm,
    editCarRequest,
    deleteCar
};