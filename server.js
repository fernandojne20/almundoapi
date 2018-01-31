var express = require('express');
var bodyParser = require('body-parser');

//create express app
var app = express();

//Parse request of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// Parse requests of content-type - application/json
app.use(bodyParser.json());

// Configuring the database
var dbConfig = require('./config/database.config.js');
var mongoose = require('mongoose');

mongoose.connect(dbConfig.url);

mongoose.connection.on('error', function() {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});

mongoose.connection.once('open', function() {
    console.log("Successfully connected to the database");
});

//enable cors 
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//main Root
app.get('/', function (req, res) {
    res.json({"message": "Welcome to Al Mundo REST API."});
});

//static assets
app.use('/assets', express.static(__dirname + '/assets'));

// require hotel routes
require('./app/routes/hotel.routes.js')(app);

//listen for requests
app.listen(process.env.PORT || 3000, function () {
    console.log("server is listening on port 3000");
})