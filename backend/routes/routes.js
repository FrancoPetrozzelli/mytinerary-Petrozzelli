const Router = require('express').Router();


const citiescontroller = require('../controllers/citiescontroller')

const {getAllMyCities, addNewCity, deleteCity, editCity, getCityById} = citiescontroller

Router.route('/allcities').get(getAllMyCities).post(addNewCity)

Router.route('/city/:id').delete(deleteCity).put(editCity).get(getCityById)

module.exports = Router