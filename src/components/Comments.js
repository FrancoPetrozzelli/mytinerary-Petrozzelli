import React, {useEffect, useState} from 'react'
import { connect } from "react-redux";
import commentsActions from '../redux/actions/commentsActions';
import { useParams} from 'react-router-dom';



const Comments = (props) =>  {
    

    const [reload, setReload] = useState(false)
    const [text, setText] = useState('')
    const [edit, setEdit] = useState(false)

    const {id} = useParams()


    async function changeComment(idUser) {
        const commentData = {
        commentID: idUser,
        comment: text,
    }
    setEdit(!edit)
    await props.modifiComment(commentData)
    props.itinerariesByCity(id)
    setReload(!reload)

}


    async function deleteUserComment(event) {

        await props.deleteComment(event.target.id)
        props.itinerariesByCity(id)
        setReload(!reload)
    }




    console.log(props.comment.userID)
    return(
        <>
        {/* {(props.comment.userID._id !== props.user.id) || props.user == null?  */}
        {props.user !== null ||  (props.user.id) === props.comment.userID ? 
        <>

        <img src={props.comment.userID.imageUrl} alt="photo"/>

            <p className='blanco'>
            {props.comment.userID.firstName}
            </p>

            <p  className='blanco'>
            {props.comment.userID.lastName}
            </p>

            <p  className='blanco'>
            {props.comment.comment}
            </p>

            <div>
            {edit?(<textarea type="text" onChange={event => setText(event.target.value)}></textarea>)
            :
            <>
            {props.comment.comment}
            </>
            }
            <button id={props.comment._id} onClick={() => changeComment(props.comment._id)}>Edit</button>
            <button id={props.comment._id} onClick={deleteUserComment} >delete</button>

            </div>
        </>
        :
        <div>
            <img src={props.comment.userID.imageUrl} alt="photo"/>
            <p  className='blanco'>
            {props.comment.userID.firstName}
            </p>
            <p  className='blanco'>
            {props.comment.userID.lastName}
            </p>
            <p  className='blanco'>
            {props.comment.comment}
            </p>
        </div>
        
    }

        </>
    );
}


const mapStateToProps = (state) => {

        return{
            
            user:state.userReducer.user,
            itinerariesByCityId:state.itinerariesReducer.itinerariesByCity

        }
}

const mapDispatchToProps = {

    addComment:commentsActions.addComment,
    modifiComment:commentsActions.modifiComment,
    deleteComment:commentsActions.deleteComment


}


export default connect(mapStateToProps, mapDispatchToProps)(Comments)