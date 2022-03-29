import React, {useEffect, useState} from 'react'
import { connect } from "react-redux";
import commentsActions from '../redux/actions/commentsActions';
import { useParams} from 'react-router-dom';
import { ConstructionOutlined } from '@mui/icons-material';



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

        {props.comment.userID?._id === props.user?.id ?
        
            <div className='commentsContainer'>

        <img src={props.comment.userID.imageUrl} alt="photo" className='userphoto'/>
        
        <div className='firstNameLastName'>
        <p className='pWhite pFirstNameLastName'>
            {props.comment.userID.firstName} 
            </p>

            
            
            <p  className='pWhite'>
            {props.comment.userID.lastName}
            </p>

            </div>
            {console.log(props.comment.userID.lastName)}
            <p  className='pWhite'>
            {props.comment.comment}
            </p>

            <div className="textareacontainer">
            {edit?(<div ><textarea type="text" onChange={event => setText(event.target.value)}  className="textarea"></textarea>
            <button id={props.comment._id} onClick={() => changeComment(props.comment._id)} className="btn btn-primary">Edit</button>
            </div>)
            :
            <>
            <button id={props.comment._id} onClick={() => changeComment(props.comment._id)} className="btn btn-primary mb-5">Edit</button>
            <button id={props.comment._id} onClick={deleteUserComment} className="btn btn-primary mb-5">delete</button>
            </>
            }
            
            </div>
        </div>
        :
        <div className='commentsContainer'>
            <img src={props.comment.userID.imageUrl} alt="photo" className='userphoto'/> 
            <div className='firstNameLastName'>
            <p  className='pWhite'>
            {props.comment.userID.firstName} 
            </p>
        
            <p  className='pWhite'>
            {props.comment.userID.lastName}
            </p>
            </div>
            <p  className='pWhite'>
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