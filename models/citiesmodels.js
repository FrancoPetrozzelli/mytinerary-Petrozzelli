const mongoose = require('mongoose')

const citiesSchema = new mongoose.Schema({
country: {type:String, required:true},
place: {type:String, required:true},
image: {type:String, required:true},
description: {type:String, required:true}
})

const allMyCities = mongoose.model('cities',citiesSchema) //'cities' es mi coleccion mongodb dentro de mytinerary
module.exports = allMyCities