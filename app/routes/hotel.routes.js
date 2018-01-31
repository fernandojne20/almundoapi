module.exports = function (app) {
  var hotels = require('../controllers/hotel.controller.js');

  // create a New Hotel

  app.post('/hotels', hotels.create);

  //retrieve all hotels
  app.get('/hotels', hotels.findAll);

  //retrieve a single Hotel with hotelId
  app.get('/hotels/:hotelId', hotels.findOne);

  //Update a Hotel with hotelId
  app.put('/hotels/:hotelId', hotels.update);

  //delete a Hotel with hotelId
  app.delete('/hotels/:hotelId', hotels.delete);

  //Insert initial dummy data
  app.post('/hotels/dummy', hotels.dummyData);
}