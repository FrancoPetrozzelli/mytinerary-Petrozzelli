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
        response: error ? "ERROR" : { myCities },
        success: error ? false : true,
        error: error,
    });

    },
};

module.exports = citiescontroller;