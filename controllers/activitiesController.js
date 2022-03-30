const Activity = require("../models/activitiesModels")


const activitiesController = {

    getActivities: (req, res)=>{

        Activity.find().populate("itineraryId")
        .then(activities=> res.json({success:true, response:activities}))
        .catch(error => console.log(error))
    },


    getActivityByID: (req, res) => {

        Activity.findOne({_id: req.params.id}).populate("itineraryId")
        .then(activity => res.json({success:true, response:activity}))
        .catch(error => console.log(error))
    },


    editActivity: (req, res) => {

        Activity.findByIdAndUpdate({_id: req.params.id}, {...req.body})
        .then((editedActivity)=> res.json({success:true, response:editedActivity}))
        .catch(error => console.log(error))
    },


    getActivitiesByItineraryId: (req, res) => {

        Activity.find({itineraryId: req.params.id}).populate("itineraryId")
        .then(activities => res.json({success:true, response:activities}))
        .catch(error => console.log(error))
    },


    addNewActivity: (req, res) => {

        const{activityName, activityImage, itineraryId} = req.body
        
        new Activity({activityName, activityImage, itineraryId}).save()
        .then((newActivity)=> res.json({success:true, response:newActivity}))
        .catch(error => console.log(error))
    },


    deleteActivity: (req, res) => {

        Activity.findByIdAndDelete({_id: req.params.id})
        .then((deletedActivity)=> res.json({success:true, response:deletedActivity}))
        .catch(error => console.log(error))
    },

}

module.exports = activitiesController;