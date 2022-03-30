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
                .populate("comments.userID", {firstName:1, lastName:1, imageUrl:1})
            }catch(error){
                console.log(error)
            }
            res.json({success:true, response:itinerary})
    
        },

        getItinerariesByCity: (req, res) => {
            allMyItineraries.find({ idcity: req.params.id }).populate("idcity")
            .populate("comments.userID", {firstName:1, lastName:1, imageUrl:1})
            .then((itinerariesByCityId) =>
            res.json({ success: true, response: itinerariesByCityId }))
            .catch((err) => res.json({ success: false, response: err }))
        }, 


        LikeDislike: async(req,res) => {
            const id=req.params.id //LLEGA POR PARAMETRO DESDE AXIOS
        const user = req.user.id //LLEGA POR RESPUESTA DE PASSPORT

    await  allMyItineraries.findOne({_id: id})

        .then((itinerary) =>{
        
            if(itinerary.likes.includes(user)){
                allMyItineraries.findOneAndUpdate({_id:id}, {$pull:{likes:user}},{new:true})//PULL QUITA, SACA
            .then((response)=> res.json({success:true, response:response.likes}))
            .catch((error) => console.log(error))
            }else{
                allMyItineraries.findOneAndUpdate({_id: id}, {$push:{likes:user}},{new:true})//PUSH AGREGA
                .then((response) => res.json({success:true, response:response.likes}))
                .catch((error) => console.log(error))
            }
        })
        .catch((error) => res.json({success:false, response:error}))
        }

};

module.exports = itinierariescontroller;


