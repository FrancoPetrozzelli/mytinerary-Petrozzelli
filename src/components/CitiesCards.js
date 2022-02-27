import {Link} from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import React, {useEffect, useState} from 'react'



const CitiesCards = () => {

    const [cities, setCities] = useState([])//es la impresion dinamica de mis cards

    const [print, setPrint] = useState([])//impresion basado en el search

    const [search, setSearch] = useState("")//busqueda del search

    const api = async () => {

        await axios.get(`http://localhost:4000/api/allcities`).then(response => {
            //console.log(response.data.response.myCities[0].country)
            setCities(response.data.response.myCities)
            setPrint(response.data.response.myCities)
            
        }).catch(error =>{console.log(error)})
    }

    useEffect(() => {

        api();
    
        }, []);


    return (

        <>



<div className="d-flex justify-content-center"> 
        <input className='' placeholder='Search..' /> </div>
        







    <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-3 g-3">

    {cities.length !== 0 ? (cities.map((city) => (
        <div className="col">
            <div className="cardcities h-100 shadow-sm"> <img src={city.image} className="card-img-top" alt="city"/>
                <div className="card-body">
            <div className=""> <p className="text-center fw-bold fs-5">{city.place}</p> </div>
            <div className=""> <p className="text-center fw-bold">{city.country}</p> </div>
            <h6 className="card-title card-description fs-5 fs-responsive">{city.description}</h6>
            <div className="text-center my-4"> <Link to='/*'> <Button className=" btn btn-details btn-warning btn-details-warning">Details</Button> </Link></div>
                </div>
            </div>
        </div>
))): <p> Search another city!</p> }

</div>
        </>

    );
}

export default CitiesCards;