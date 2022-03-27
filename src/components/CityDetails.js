import UnderConstruction from "./UnderConstruction";
import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { Link as LinkRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import citiesActions from "../redux/actions/citiesActions";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { connect } from "react-redux";
import ItinerariesNotFound from "./ItinerariesNotFound";
import commentsActions from "../redux/actions/commentsActions";
import Itinerary from "./Itinerary";

const CityDetails = (props) => {
    // console.log(props) 
    

        let {id} = useParams()

        useEffect( () =>{
            props.itinerariesByCity(id)
            props.cityById(id)
            
        },[]
        )
        // console.log(props.specificCity)
        console.log(props.itinerariesByCityId)

        const [button, setButton] = useState(false) 

        const buttonFunction = () => {
            
            setButton(!button)

        }
        
            // LIKES

        const [reload, setReload] = useState(false)

        async function likesOrDislikes(idItinerary) {
            await props.likeDislike(idItinerary)
                props.itinerariesByCity(id)
            
            setReload(!reload)
        }
        

        // COMMENTS

        const [inputText, setInputText] = useState()
        const [modifi, setModifi] = useState()
        const [place, setPlace] = useState()


        async function chargeComment(event) {

            const commentData = {
                place: place._id,
            comment: inputText,
            }
            await props.addComment(commentData)
            .then(response => setPlace(response.data.response.newComment), setInputText(""))
        
        }
        
        async function changeComment(event) {
            const commentData = {
            commentID: event.target.id,
            comment: modifi,
            }
            await props.modifiComment(commentData)
            setReload(!reload)
        
        }
        async function deleteComments(event) {
            await props.deleteComment(event.target.id)
            setReload(!reload)
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
            <Itinerary itinerary={itinerary}/>
//         <div key={itinerary._id}>
//             <div className="itinerariesCardContainer d-flex justify-content-center">
//                 <div className="itinerariesCard ">
//                     <div className="titleCardsItineraries">
//                 <h2 className="itineraryTitle">{itinerary.itinerary}</h2>
//                     </div>

//                 <div className="userImageContainer">
//                     <h3 className="userName f-white">
//                         {itinerary.username}
//                     </h3>
//                     <img className="sizeImage" src={process.env.PUBLIC_URL +"/assets/"+ itinerary.userimage} alt="user"/>
//                 </div>

//                 <div className="containerData">
//                 <p className="d-flex f-white sizeData">Price: <span >{"💰".repeat(parseInt(itinerary.price))}</span ></p>
//                 <p className="d-flex f-white sizeData">Duration: {itinerary.duration}</p>
//                 <p className="d-flex f-white sizeDataDos">{itinerary.description}</p>
                
//                 { <div className="likeDislike">

//         {props.user ?
//             (<div onClick={()=>likesOrDislikes(itinerary._id)}>
//                 {itinerary?.likes.includes(props.user.id) ?
//                 <span style={{ color: "red", fontSize:30}} class="material-icons heart">favorite</span> :
//                 <span style={{  fontSize:30, color:'white'}}class="material-icons heart">favorite_border</span>}</div>)

//             : (<span style={{  fontSize:30, color:'white' }} class="material-icons heart">favorite_border</span>)
//         }

//             <h3 style={{  color:"white ",fontSize:30 }}>{itinerary?.likes.length}</h3>
//                 </div>}
        



//                 <div className="d-flex f-white hashtags ">{itinerary.hashtags.map((hashtagsMap, hashtagsKey) => 
//                 <div key={hashtagsKey}>
//                 {hashtagsMap }
//                 </div> ) 
//                 }</div>

//                 <div class="commentsContainer  ">

            
//         {itinerary?.comments.map(comment =>
//             <>
//         {comment.userID?._id !== props.user?.id ?
//         <div class="card cardComments " key={comment._id}>
//         <div class="card-header">
//         {comment.userID?.fullName}
//         </div>
//         <div class="card-body">
//         <p class="card-text">{comment.comment}</p>
//         </div>
//         </div> :

//         <div class="card cardComments">
//         <div class="card-header">
//         {comment.userID.fullName}
//         </div>
//         <div class="card-body ">
//         <textarea type="text" className="card-text textComments" onChange={(event) => setModifi(event.target.value)} defaultValue={comment.comment} />
//         <button id={comment._id} onClick={changeComment} class="btn btn-primary">Modificar</button>
//         <button id={comment._id} onClick={deleteComments} class="btn btn-primary">Eliminar</button>
//         </div>
//         </div>

//         }
//         </>
// )}

//     {props.user ?
//         <div class="card cardComments">
//         <div class="card-header">
//             DEJANOS TU COMENTARIO
//         </div>
//             <div class="card-body ">
//         <textarea onChange={(event) => setInputText(event.target.value)} className="card-text textComments" value={inputText} />
//         <button onClick={chargeComment} class="btn btn-primary">Cargar</button>
//         </div>
//         </div> :
//         <h1>Realiza singIn y dejanos tu comentario</h1>
// }
//         </div>



//                 </div>

//                 {!button && <div className="d-flex justify-content-center"><Button onClick={buttonFunction} className=" btn btn-details btn-warning btn-details-warning btnCityDetails">
//                         {button ? "less info" : "more info" }
//                         </Button>
//                         </div>
//                         }
//                 {button && <div><UnderConstruction/> <div className="d-flex justify-content-center"><Button onClick={buttonFunction} className=" btn btn-details btn-warning btn-details-warning btnCityDetails">
//                         {button ? "less info" : "more info" }
//                         </Button>
//                                                     </div>
//                         </div> }
                    
//                 </div>
//             </div>
//         </div>






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
        itinerariesByCityId:state.itinerariesReducer.itinerariesByCity,
        user:state.userReducer.user
    }
}

const mapDispatchToProps = { //aca se manejan las acciones

    itinerariesByCity:itinerariesActions.itinerariesByCity,
    cityById:citiesActions.cityById,
    likeDislike: itinerariesActions.likeDislike,
    addComment: commentsActions.addComment,
    modifiComment: commentsActions.modifiComment,
    deleteComment: commentsActions.deleteComment,
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