const allMyCities = require("../models/citiesmodels")

const citiescontroller = {
    getAllMyCities: async (req, res) => {
    let myCities;
    let error = null;

    try {
        myCities = await allMyCities.find();
    } catch (err) {
        error = err;
        console.log(error);
    }
    res.json({
        response: error ? "ERROR" :  myCities ,
        success: error ? false : true,
        error: error,
    });

    },

    addNewCity: (req, res) => {

        const {country, place, image, description} = req.body

        new allMyCities({country, place, image, description}).save()
        .then(response => res.json({success:true, response:response}))
        .catch(err => res.json({success:false, response:err})) 

    },


    deleteCity: async (req, res) => {

        let city;
        const id = req.params.id

        try{
            city = await allMyCities.findOneAndDelete({_id:id})
            

        }catch(error){

            console.log(error)

        }
        res.json({success:true, response:city})


    },

    editCity: async (req, res) => {

        const id = req.params.id
        let edit;
        
        try{

            edit = await allMyCities.findOneAndUpdate({_id:id}, req.body, {new:true})

        }catch(error){

            console.log(error)

        }
        res.json({success:true, response:edit})



    },

    getCityById: async (req, res) => {

        const id = req.params.id
        let city;

        try{
            city = await allMyCities.findOne({_id:id})


        }catch(error){

            console.log(error)

        }
        res.json({success:true, response:city})

    }


};

module.exports = citiescontroller;


