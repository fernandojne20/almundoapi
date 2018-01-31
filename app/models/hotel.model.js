var mongoose = require('mongoose');

var HotelSchema = mongoose.Schema({
    id: String,
    name: String,
    stars: Number,
    price: Number,
    image: String,
    amenities: [String]
}, {
    timestamps: true
});

module.exports = mongoose.model('Hotel', HotelSchema);