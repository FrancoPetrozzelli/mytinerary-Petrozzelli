import cities from "../pages/Cities";
import UnderConstruction from "./UnderConstruction";
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { Link as LinkRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";


const CityDetails = () => {
    

        
        const [printCities, setPrintCities] = useState([])
        let {id} = useParams()
        useEffect(() => {
            
            axios.get(`http://localhost:4000/api/allcities`).then(response => {
                //console.log(response.data.response.myCities[0].country)
                
                setPrintCities(response.data.response.myCities.filter(city =>
                city._id === id))
                
                
            }).catch(error =>{console.log(error)});


            // axios.get(`http://localhost:4000/api/city/${id}`)
            // .then(response=>{setPrintCities(response.data.response)})
            
            }, []);
    
    return ( 
        <>
        {printCities?.map(city => 

            <div className="HeroDetails d-flex justify-content-center " style={{backgroundImage: `url('${process.env.PUBLIC_URL+"/assets/"+ city.image}' )`}}>
                
        <h1 className="cityDetails">{city.place}</h1>
                
            </div>

        )}
            
                <div className="d-flex justify-content-center mt-5">
                    <LinkRouter to={`/cities`}>
                        {" "}
                        <Button className=" btn btn-details btn-warning btn-details-warning btnCityDetails">
                        Go back to Cities
                        </Button>{" "}
                    </LinkRouter>
                </div>
        <UnderConstruction/>
        </>
    );
}

export default CityDetails;