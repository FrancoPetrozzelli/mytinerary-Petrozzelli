const Router = require('express').Router();

const validator = require('../config/validator')

// CITIES CONTROLLER
const citiescontroller = require('../controllers/citiescontroller')

const {getAllMyCities, addNewCity, deleteCity, editCity, getCityById} = citiescontroller

Router.route('/allcities').get(getAllMyCities).post(addNewCity)

Router.route('/city/:id').delete(deleteCity).put(editCity).get(getCityById)

// ITINERARIES CONTROLLER

const itinerariescontroller = require('../controllers/itinerariescontroller')

const {getAllMyItineraries, addNewItinerary, deleteItinerary, editItinerary, getItineraryById, getItinerariesByCity} = itinerariescontroller

Router.route('/itineraries').get(getAllMyItineraries).post(addNewItinerary)

Router.route('/itinerary/:id').delete(deleteItinerary).put(editItinerary).get(getItineraryById)

Router.route('/itineraries/:id').get(getItinerariesByCity)


// USER CONTROLLERS


const userControllers = require('../controllers/usersControllers')
const {signUpUsers, logInUser} = userControllers

//, logOutUser

Router.route('/auth/signUp').post(validator, signUpUsers)
Router.route('/auth/logIn').post(logInUser)
// Router.route('/auth/logout').post(logOutUser)

module.exports = Router