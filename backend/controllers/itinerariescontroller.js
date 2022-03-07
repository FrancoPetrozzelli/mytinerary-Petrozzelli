const allMyItineraries = require("../models/itinerariesmodels")

const itinierariescontroller = {
    getAllMyItineraries: async (req, res) => {
        let myItineraries;
        let error = null;
    
        try {
            myItineraries = await allMyItineraries.find().populate("idcity");
        } catch (err) {
            error = err;
            console.log(error);
        }
        res.json({
            response: error ? "ERROR" :  myItineraries ,
            success: error ? false : true,
            error: error,
        });
    
        },

        addNewItinerary: (req, res) => {

            const {idcity, city, itinerary, price, duration, username, userimage, flag, likes, hashtags, comments, description} = req.body
            new allMyItineraries({idcity, city, itinerary, price, duration, username, userimage, flag, likes, hashtags, comments, description}).save()
            .then(response => res.json({success:true, response:response}))
            .catch(err => res.json({success:false, response:err})) 
    
        },

        deleteItinerary: async (req, res) => {

            let itinerary;
            const id = req.params.id
    
            try{
                itinerary = await allMyItineraries.findOneAndDelete({_id:id})
            }catch(error){
                console.log(error)
            }
            res.json({success:true, response:itinerary})
        },

        editItinerary: async (req, res) => {

            const id = req.params.id
            let edit;
            
            try{
                edit = await allMyItineraries.findOneAndUpdate({_id:id}, req.body, {new:true})
            }catch(error){
                console.log(error)
            }
            res.json({success:true, response:edit})
    
        },

        getItineraryById: async (req, res) => {

            const id = req.params.id
            let itinerary;
    
            try{
                itinerary = await allMyItineraries.findOne({_id:id})
            }catch(error){
                console.log(error)
            }
            res.json({success:true, response:itinerary})
    
        },

        getItinerariesByCity: (req, res) => {
            allMyItineraries.find({ idcity: req.params.id }).populate("idcity")
            .then((itinerariesByCityId) =>
            res.json({ success: true, response: itinerariesByCityId }))
            .catch((err) => res.json({ success: false, response: err }))
        }, 


};

module.exports = itinierariescontroller;


