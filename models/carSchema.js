//Require Mongoose
var mongoose = require('mongoose');

//Define a schema
var Schema = mongoose.Schema;

var CarSchema = new Schema({
    title: String,
    isNew: { type: Boolean, default: false},
    isUsed: { type: Boolean, default: false},
    make: { type: Number, default: 2019},
    distance: { type: Number, default: 1},
    model: String,
    price: mongoose.Types.Decimal128,
    imageUrl: [{ type: String }],

});

// Compile model from schema
var CarModel = mongoose.model('CarModel', CarSchema);