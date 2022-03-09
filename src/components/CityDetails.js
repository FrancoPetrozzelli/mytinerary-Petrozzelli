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
            <div className="itinerariesCardContainer d-flex justify-content-center  m-5">
                <div className="itinerariesCard bg-warning ">
                    <div className="titleCardsItineraries">
                <h2>{itinerary.itinerary}</h2>
                    </div>

                <div className="userImageContainer">
                    <h3 className="userName">
                        {itinerary.username}
                    </h3>
                    <img className="sizeImage" src={process.env.PUBLIC_URL +"/assets/"+ itinerary.userimage} alt="user"/>
                </div>

                


                {/* <p>Price: {itinerary.price}</p> */}
                {/* <div>
                    {[...Array(price)].map((money, x) =>{

                        return()




                    }



                    )}
                </div> */}
                






                <p>Duration: {itinerary.duration}</p>
                <p>{itinerary.description}</p>
                <div>{itinerary.hashtags.map((hashtagsMap, hashtagsKey) => 
                <div key={hashtagsKey}>
                {hashtagsMap }
                </div> ) 
                }</div>

                {!button && <Button onClick={buttonFunction} className=" btn btn-details btn-warning btn-details-warning btnCityDetails">
                        {button ? "less info" : "more info" }
                        </Button>
                        }
                {button && <div><UnderConstruction/> <Button onClick={buttonFunction} className=" btn btn-details btn-warning btn-details-warning btnCityDetails">
                        {button ? "less info" : "more info" }
                        </Button>
                        </div> }
                    
                </div>
            </div>
        </div>






            )}
            </>
        ):(<>
            <p>no hay  itinerarios</p>
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