import UnderConstruction from "./UnderConstruction";
import React, {useEffect, useState, useRef} from 'react'
import {useParams} from 'react-router-dom'
import { Link as LinkRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import citiesActions from "../redux/actions/citiesActions";
import itinerariesActions from "../redux/actions/itinerariesActions";
import { connect } from "react-redux";
import ItinerariesNotFound from "./ItinerariesNotFound";
import commentsActions from "../redux/actions/commentsActions";
import Activities from "./Activities";
import Comments from "./Comments";
import MakeComments from "./MakeComments";
import { comment } from "postcss";


const Itineraries = (props) => {
    console.log(props) 
    const input = useRef()

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


        async function chargeComment(event, itineraryId) {

            const comment = {
                itinerary: itineraryId,
                // comment: inputText,
                comment: input.current.value,
            }
            await props.addComment(comment)
            input.current.value=""
            console.log("cargue el comentario")
            console.log(comment)
            props.itinerariesByCity(id)
            // .then(response => setPlace(response.data.response.newComment), setInputText(""))
        
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
        <div key={props.itinerary._id}>
            {console.log(props.itinerary._id)}
            <div className="itinerariesCardContainer d-flex justify-content-center">
                <div className="itinerariesCard ">
                    <div className="titleCardsItineraries">
                <h2 className="itineraryTitle">{props.itinerary.itinerary}</h2>
                    </div>

                <div className="userImageContainer">
                    <h3 className="userName f-white">
                        {props.itinerary.username}
                    </h3>
                    <img className="sizeImage" src={process.env.PUBLIC_URL +"/assets/"+ props.itinerary.userimage} alt="user"/>
                </div>

                <div className="containerData">
                <p className="d-flex f-white sizeData">Price: <span >{"💰".repeat(parseInt(props.itinerary.price))}</span ></p>
                <p className="d-flex f-white sizeData">Duration: {props.itinerary.duration}</p>
                <p className="d-flex f-white sizeDataDos">{props.itinerary.description}</p>
                
                { <div className="likeDislike">

        {props.user ?
            (<div onClick={()=>likesOrDislikes(props.itinerary._id)}>
                {props.itinerary?.likes.includes(props.user.id) ?
                <span style={{ color: "red", fontSize:30}} class="material-icons heart">favorite</span> :
                <span style={{  fontSize:30, color:'white'}}class="material-icons heart">favorite_border</span>}</div>)

            : (<span style={{  fontSize:30, color:'white' }} class="material-icons heart">favorite_border</span>)
        }

            <h3 style={{  color:"white ",fontSize:30 }}>{props.itinerary?.likes.length}</h3>
                </div>}
        



                <div className="d-flex f-white hashtags ">{props.itinerary.hashtags.map((hashtagsMap, hashtagsKey) => 
                <div key={hashtagsKey}>
                {hashtagsMap }
                </div> ) 
                }</div>

                {/* <div class="commentsContainer  ">

            
        {props.itinerary?.comments.map(comment => {
                    return(<>
        {comment.userID?._id !== props.user?.id ?
        <div class="card cardComments " key={comment._id}>
        <div class="card-header">
        {comment.userID?.fullName}
        </div>
        <div class="card-body">
        <p class="card-text">{comment.comment}</p>
        </div>
        </div> :

        <div class="card cardComments">
        <div class="card-header">
        {comment.userID.fullName}
        </div>
        <div class="card-body ">
        <textarea type="text" className="card-text textComments" onChange={(event) => setModifi(event.target.value)} defaultValue={comment.comment} />
        <button id={comment._id} onClick={changeComment} class="btn btn-primary">Modificar</button>
        <button id={comment._id} onClick={deleteComments} class="btn btn-primary">Eliminar</button>
        </div>
        </div>

        }
        </>)}
        
)}

    {props.user ?
        <div class="card cardComments">
        <div class="card-header">
            DEJANOS TU COMENTARIO
        </div>
            <div class="card-body ">
        <textarea onChange={(event) => setInputText(event.target.value)} className="card-text textComments" value={inputText} />
        <textarea ref={input} className="card-text textComments"  />
        {console.log(props.itinerary._id)}
        <button onClick={()=>chargeComment(null, props.itinerary._id)} class="btn btn-primary">Cargar</button>
        </div>
        </div> :
        <h1>Realiza singIn y dejanos tu comentario</h1>
}
        </div> */}



                </div>

                {!button && <div className="d-flex justify-content-center"><Button onClick={buttonFunction} className=" btn btn-details btn-warning btn-details-warning btnCityDetails">
                        {button ? "less info" : "more info" }
                        </Button>
                        </div>
                        }
                {button && 
                <div>
                    <div>
                    <Activities id={props.itinerary._id}/> 
                    <MakeComments id={props.itinerary._id} itinerariesByCity={props.itinerariesByCity}/>
                    {props.itinerary.comments.map(comment => <Comments id={props.itinerary._id} comment={comment} itinerariesByCity={props.itinerariesByCity}/>)}
                    
                        <div className="d-flex justify-content-center">
                        <Button onClick={buttonFunction} className=" btn btn-details btn-warning btn-details-warning btnCityDetails">
                        {button ? "less info" : "more info" }
                        </Button>
                        </div>
                    </div>
                </div> }
                    
                </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Itineraries); 





