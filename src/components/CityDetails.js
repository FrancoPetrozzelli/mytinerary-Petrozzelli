import cities from "../pages/Cities";
import UnderConstruction from "./UnderConstruction";
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'


const CityDetails = () => {
    

        
        const [printCities, setPrintCities] = useState([])
        let {id} = useParams()
        useEffect(() => {
            
            axios.get(`http://localhost:4000/api/allcities`).then(response => {
                //console.log(response.data.response.myCities[0].country)
                
                setPrintCities(response.data.response.myCities.filter(city =>
                city._id === id))
                
                
            }).catch(error =>{console.log(error)});
            
            }, []);
    
    return ( 
        <>
        {printCities?.map(city => 
            <h1>ESTAS EN {city.place} </h1>
        )}
        <UnderConstruction/>
        </>
    );
}

export default CityDetails;