const mongoose = require('mongoose')

const itinerariesSchema = new mongoose.Schema({
idcity:{type:mongoose.Types.ObjectId, ref:"cities"},
city: {type:String, required:true},
itinerary: {type:String, required:true},
price: {type:Number, required:true},
duration:{type:String, required:true},
username:{type:String, required:true},
userimage:{type:String, required:true},
flag:{type:String, required:true},
likes: { type: Number , default:0 },
hashtags: [{ type: String, required: true }],
comments: [],
description: {type:String, required:true}
})

const allMyItineraries = mongoose.model('itineraries',itinerariesSchema) //'itineraries' es mi coleccion mongodb dentro de mytinerary
module.exports = allMyItineraries 