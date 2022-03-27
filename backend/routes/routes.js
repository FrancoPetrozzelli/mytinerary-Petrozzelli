const Router = require('express').Router();

const validator = require('../config/validator')



// CITIES CONTROLLER
const citiescontroller = require('../controllers/citiescontroller')

const {getAllMyCities, addNewCity, deleteCity, editCity, getCityById} = citiescontroller

Router.route('/allcities').get(getAllMyCities).post(addNewCity)

Router.route('/city/:id').delete(deleteCity).put(editCity).get(getCityById)

// ITINERARIES CONTROLLER

const itinerariescontroller = require('../controllers/itinerariescontroller')

const {getAllMyItineraries, addNewItinerary, deleteItinerary, editItinerary, getItineraryById, getItinerariesByCity, LikeDislike} = itinerariescontroller

Router.route('/itineraries').get(getAllMyItineraries).post(addNewItinerary)

Router.route('/itinerary/:id').delete(deleteItinerary).put(editItinerary).get(getItineraryById)

Router.route('/itineraries/:id').get(getItinerariesByCity)


// USER CONTROLLERS


const userControllers = require('../controllers/usersControllers')
const {signUpUsers, logInUser, verifyEmail, TokenVerify,} = userControllers

const passport = require('../config/passport')

//, logOutUser

Router.route('/auth/signup').post(validator, signUpUsers)
Router.route('/auth/login').post(logInUser)
// Router.route('/auth/logout').post(logOutUser)

Router.route('/verify/:uniqueString') //RECIBE EL LINK DE USUARIO
.get(verifyEmail) //LLAMA A FUNCION DE VERIFICACIION

Router.route('/auth/signInToken')
.get(passport.authenticate('jwt',{ session:false }), TokenVerify)


// like dislikes

Router.route("/itineraries/like/:id")
.put(passport.authenticate("jwt", {session: false}),LikeDislike)

// comments

//COMMENTS REQUIRES
const commentsControllers = require('../controllers/commentsController')
const {addComment, modifiComment,deleteComment}= commentsControllers
Router.route('/itineraries/comment')
.post(passport.authenticate('jwt',{ session: false }),addComment)

Router.route('/itineraries/comment/:id')
.post(passport.authenticate('jwt',{ session: false }),modifiComment)
.delete(passport.authenticate('jwt',{ session: false }),deleteComment)

// Activities


const activitiesController = require('../controllers/activitiesController')
const {getActivities, getActivityByID, editActivity, getActivitiesByItineraryId, addNewActivity, deleteActivity}= activitiesController

Router.route("/activities")
.get(getActivities).post(addNewActivity)

Router.route("/activities/:id")
.get(getActivityByID)
.put(editActivity)
.delete(deleteActivity)

Router.route("/itineraryactivity/:id")
.get(getActivitiesByItineraryId)










module.exports = Router