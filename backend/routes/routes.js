const Router = require('express').Router();


const citiescontroller = require('../controllers/citiescontroller')
const {getAllMyCities} = citiescontroller
Router.route('/allcities')
.get(getAllMyCities)
module.exports = Router