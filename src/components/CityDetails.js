import cities from "../pages/Cities";
import UnderConstruction from "./UnderConstruction";
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { Link as LinkRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import citiesActions from "../redux/actions/citiesActions";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { connect } from "react-redux";
import ItinerariesNotFound from "./ItinerariesNotFound";


const CityDetails = (props) => {
    // console.log(props) 

        
        const [printCities, setPrintCities] = useState([])
        let {id} = useParams()

        useEffect( () =>{
            props.itinerariesByCity(id)
            props.cityById(id)
            
        },[]
        )
        // console.log(props.specificCity)
        // console.log(props.itinerariesByCityId)

        const [button, setButton] = useState(false) 

        const buttonFunction = () => {
            
            setButton(!button)

        }
         
        


    return ( 
        <>
        {props.specificCity._id && 

            <div className="HeroDetails d-flex justify-content-center " style={{backgroundImage: `url('${process.env.PUBLIC_URL+"/assets/"+ props.specificCity.image}' )`}}>
                
        <h1 className="cityDetails">{props.specificCity.place}</h1>
                
            </div>

        }

        {props.itinerariesByCityId.length ? (
            <>
            {props.itinerariesByCityId.map(itinerary => 
        <div key={itinerary._id}>
            <div className="itinerariesCardContainer d-flex justify-content-center">
                <div className="itinerariesCard ">
                    <div className="titleCardsItineraries">
                <h2 className="itineraryTitle">{itinerary.itinerary}</h2>
                    </div>

                <div className="userImageContainer">
                    <h3 className="userName f-white">
                        {itinerary.username}
                    </h3>
                    <img className="sizeImage" src={process.env.PUBLIC_URL +"/assets/"+ itinerary.userimage} alt="user"/>
                </div>

                <div className="containerData">
                <p className="d-flex f-white sizeData">Price: <span >{"💰".repeat(parseInt(itinerary.price))}</span ></p>
                <p className="d-flex f-white sizeData">Duration: {itinerary.duration}</p>
                <p className="d-flex f-white sizeDataDos">{itinerary.description}</p>
                <p className="f-white sizeDataDos spaceLikes">{itinerary.likes + "💗"}</p>
                <div className="d-flex f-white hashtags ">{itinerary.hashtags.map((hashtagsMap, hashtagsKey) => 
                <div key={hashtagsKey}>
                {hashtagsMap }
                </div> ) 
                }</div>

                </div>

                {!button && <div className="d-flex justify-content-center"><Button onClick={buttonFunction} className=" btn btn-details btn-warning btn-details-warning btnCityDetails">
                        {button ? "less info" : "more info" }
                        </Button>
                        </div>
                        }
                {button && <div><UnderConstruction/> <div className="d-flex justify-content-center"><Button onClick={buttonFunction} className=" btn btn-details btn-warning btn-details-warning btnCityDetails">
                        {button ? "less info" : "more info" }
                        </Button>
                                                    </div>
                        </div> }
                    
                </div>
            </div>
        </div>






            )}
            </>
        ):(<>
            <ItinerariesNotFound/>
            </>
            )
        }
            
                <div className="d-flex justify-content-center mt-5">
                    <LinkRouter to={`/cities`}>
                        {" "}
                        <Button className=" btn btn-details btn-warning btn-details-warning btnCityDetails">
                        Go back to Cities
                        </Button>{" "}
                    </LinkRouter>
                </div>
        </>
    );
}

const mapStateToProps = state => { // se manejan los reducer
    return {

        specificCity:state.citiesReducer.specificCity,
        itinerariesByCityId:state.itinerariesReducer.itinerariesByCity

    }
}

const mapDispatchToProps = { //aca se manejan las acciones

    itinerariesByCity:itinerariesActions.itinerariesByCity,
    cityById:citiesActions.cityById
}

export default connect(mapStateToProps, mapDispatchToProps)(CityDetails); 





// WITHOUT REDUX

// const CityDetails = () => {
    

        
//     const [printCities, setPrintCities] = useState([])
//     let {id} = useParams()
//     useEffect(() => {
        
//         axios.get(`http://localhost:4000/api/allcities`).then(response => {
//             //console.log(response.data.response.myCities[0].country)
            
//             setPrintCities(response.data.response.myCities.filter(city =>
//             city._id === id))
            
            
//         }).catch(error =>{console.log(error)});


//         // axios.get(`http://localhost:4000/api/city/${id}`)
//         // .then(response=>{setPrintCities(response.data.response)})
        
//         }, []);

// return ( 
//     <>
//     {printCities?.map(city => 

//         <div className="HeroDetails d-flex justify-content-center " style={{backgroundImage: `url('${process.env.PUBLIC_URL+"/assets/"+ city.image}' )`}}>
            
//     <h1 className="cityDetails">{city.place}</h1>
            
//         </div>

//     )}
        
//             <div className="d-flex justify-content-center mt-5">
//                 <LinkRouter to={`/cities`}>
//                     {" "}
//                     <Button className=" btn btn-details btn-warning btn-details-warning btnCityDetails">
//                     Go back to Cities
//                     </Button>{" "}
//                 </LinkRouter>
//             </div>
//     <UnderConstruction/>
//     </>
// );
// }

// export default CityDetails;