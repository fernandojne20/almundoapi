var Hotel = require('../models/hotel.model.js');
var initData = require('../../config/init-data.config.js');

exports.create = function (req, res) {
    //create and save a new hotel
    if(!req.body.id) {
        res.status(400).send({message: "Id can not be empty"});
    }
    if(!req.body.name) {
        res.status(400).send({message: "Name can not be empty"});
    }
    if(!req.body.stars) {
        res.status(400).send({message: "stars can not be empty"});
    }
    if(!req.body.price) {
        res.status(400).send({message: "Price can not be empty"});
    }
    if(!req.body.image) {
        res.status(400).send({message: "Image can not be empty"});
    }
    if(!req.body.amenities) {
        res.status(400).send({message: "Amenities can not be empty"});
    }

    var hotel = new Hotel({
        id: req.body.id, 
        name: req.body.name,
        stars: req.body.stars,
        price: req.body.price,
        image: req.body.image,
        amenities: req.body.amenities
    });

    hotel.save(function (err, data) {
       console.log(data);
       if(err){
           console.log(err);
           res.status(500).send({message: "Some error occurred while creating the hotel."});
       } else{
           res.send(data);
       }
    });
}

exports.findAll = function (req, res) {

    var condition = {};
    if (req.query.stars){
        condition.stars = {"$in" : req.query.stars};
    }
    if (req.query.name){
        condition.name = {$regex: req.query.name, $options: 'i'};
    }

    //Retrieve and return all hotel from the database.
    Hotel.find(condition,function (err, hotels) {
       if (err){
           res.status(500).send({message: "Some error ocurred while retrieving hotels"});
       } else {
           res.send(setImagesUrl(hotels));
       }
    });
}

exports.findOne = function (req, res) {
    //Find a single hotel with a hotelId
    Hotel.find({id: req.params.hotelId}, function (err, data) {
       if (err) {
            res.status(500).send({message: "could not retrieve hotel with id " + req.params.hotelId});
       } else{
            res.send(setImagesUrl(data));
       }
    });
}

exports.update = function (req, res) {
    //Update a hotel indetified by the hotelId in the request
    var values = {name: req.body.name, stars: req.body.stars, price: req.body.price, image: req.body.image, amenities: req.body.amenities};
    Hotel.findOneAndUpdate({id: req.params.hotelId},{$set: values},{new: true}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not find a hotel with id " + req.params.hotelId});
        }else{
            res.send(data);
        }
    });
}

exports.delete = function (req, res) {
    //delete a hotel with the especified hotelId in the request
    Hotel.remove({id: req.params.hotelId}, function(err, data) {
        if(err) {
            res.status(500).send({message: "Could not delete hotel with id " + req.params.id});
        } else {
            res.send({message: "hotel deleted successfully!"});
        }
    });
}

exports.dummyData = function (req, res) {
    //Insert dummie or initial data to mongodb
    Hotel.insertMany(initData.data).then(function (docs) {
        res.send(docs);
    })
    .catch(function (error) {
        res.status(500).send({message: "Some error occurred while creating the hotel."});
    });
}

//private functions
function setImagesUrl(hotels) {
    hotels.forEach(function (hotel) {
        hotel.image = initData.assetUrl + 'hotels/' + hotel.image;
        hotel.amenities.forEach(function (amenitie, index) {
            hotel.amenities[index] = initData.assetUrl + 'amenities/' + amenitie + '.svg';
        });
    });

    return hotels;
}