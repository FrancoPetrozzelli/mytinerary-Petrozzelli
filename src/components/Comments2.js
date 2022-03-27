// import React, {useEffect, useState} from 'react'
// import { connect } from "react-redux";
// import itinerariesActions from "../redux/actions/itinerariesActions";
// import { useParams } from 'react-router-dom';



// const Comments = (props) => {


//     const {id} = useParams()

// const [inputText, setInputText] = useState('')
// const [modifi, setModifi] = useState(false)
// const [reload, setReload] = useState(false)


// // async function chargeComment(event) {

// //     const commentData = {
// //         place: place._id,
// //     comment: inputText,
// //     }
// //     await props.addComment(commentData)
// //     .then(response => setPlace(response.data.response.newComment), setInputText(""))

// // }

// async function changeComment(event) {
//     const commentData = {
//     commentID: event,
//     comment: inputText,
//     }
//     setModifi(!modifi)
//     await props.modifiComment(commentData)
//     props.getItinerariesByCity(id)
//     setReload(!reload)

// }
// async function deleteComments(event) {
//     await props.deleteComment(event.target.id)
//     props.getItinerariesByCity(id)
//     setReload(!reload)
// }


//     return(
//     <>

// <div class="commentsContainer  ">

            
//         {props.itinerary?.comments.map(comment => {
//                     return(<>
//         {comment.userID?._id !== props.user?.id ?
//         <div class="card cardComments " key={comment._id}>
//         <div class="card-header">
//         {props.comment.userID?.firstName}
//         </div>
//         <div class="card-body">
//         <p class="card-text">{props.comment.comment}</p>
//         </div>
//         </div> :

//         <div class="card cardComments">
//         <div class="card-header">
//         {props.comment.userID.firstName}
//         </div>
//         <div class="card-body ">
//         <textarea type="text" className="card-text textComments" onChange={(event) => setModifi(event.target.value)} defaultValue={props.comment.comment} />
//         <button id={props.comment._id} onClick={changeComment} class="btn btn-primary">Modificar</button>
//         <button id={props.comment._id} onClick={deleteComments} class="btn btn-primary">Eliminar</button>
//         </div>
//         </div>

//         }
//         </>)}
        
// )}

//     {props.user ?
//         <div class="card cardComments">
//         <div class="card-header">
//             DEJANOS TU COMENTARIO
//         </div>
//             <div class="card-body ">
//         <textarea onChange={(event) => setInputText(event.target.value)} className="card-text textComments" value={inputText} />
//         <textarea className="card-text textComments"  />
//         {console.log(props.itinerary._id)}
//         <button onClick={()=>chargeComment(null, props.itinerary._id)} class="btn btn-primary">Cargar</button>
//         </div>
//         </div> :
//         <h1>Realiza singIn y dejanos tu comentario</h1>
// }
//         </div>






//     </>
// );
// }


// const mapStateToProps = (state) => {
//     return {
//         specificCity:state.citiesReducer.specificCity,
//         itinerariesByCityId:state.itinerariesReducer.itinerariesByCity,
//         user:state.userReducer.user
//     }
// }

// const mapDispatchToProps = {
//     addComment: commentsActions.addComment,
//     modifiComment: commentsActions.modifiComment,
//     deleteComment: commentsActions.deleteComment,
// }

// export default connect(mapStateToProps, mapDispatchToProps)(Comments);