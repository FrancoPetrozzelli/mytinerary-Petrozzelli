const Router = require('express').Router();

// CITIES CONTROLLER
const citiescontroller = require('../controllers/citiescontroller')

const {getAllMyCities, addNewCity, deleteCity, editCity, getCityById} = citiescontroller

Router.route('/allcities').get(getAllMyCities).post(addNewCity)

Router.route('/city/:id').delete(deleteCity).put(editCity).get(getCityById)

// ITINERARIES CONTROLLER

const itinerariescontroller = require('../controllers/itinerariescontroller')

const {getAllMyItineraries, addNewItinerary, deleteItinerary, editItinerary, getItineraryById} = itinerariescontroller

//, getItinerariesByCity AGREGAR A LA CONSTANTE CUANDO HAGA EL GET ITINEARRIESBYCITY
Router.route('/itineraries').get(getAllMyItineraries).post(addNewItinerary)

Router.route('/itinerary/:id').delete(deleteItinerary).put(editItinerary).get(getItineraryById)

//Router.route('/itineraries/:id').get(getItinerariesByCity)


module.exports = Router