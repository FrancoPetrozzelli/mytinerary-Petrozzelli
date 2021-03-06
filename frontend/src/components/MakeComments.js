import React, {useState, useRef} from 'react'
import { connect } from "react-redux";
import itinerariesActions from "../redux/actions/itinerariesActions";
import commentsActions from '../redux/actions/commentsActions';
import { useParams } from 'react-router-dom';

const MakeComments = (props) => {

    const {id} = useParams()


    const input = useRef()
    const [text, setText] = useState()

    async function chargeComment() {
        const commentData = {
        itinerary: props.id,
        comment: input.current.value,
        }
        console.log(commentData)
        await props.addComment(commentData)
        input.current.value= ''
        props.itinerariesByCity(id)
    }


    return ( 
        <>
                {props.user ?
                    <div className='divMakeComments'>
                        <div className='divMakeCommentsSon'>
                            <textarea ref={input} value={text} placeholder='Comment here'/>
                            <button onClick={() => chargeComment()} className="btn btn-primary btnComment">Comment</button>
                    </div>
                    </div> 
                
                    :

                    <div className='pWhite signupComment'><span>SIGN UP TO COMMENT</span></div>
                }
        </>
    );
}

const mapStateToProps = (state) => {
    return {

        itinerariesByCity: state.itinerariesReducer.itinerariesByCity,
        user: state.userReducer.user
        
    }
}

const mapDispatchToProps = {

    addComment: commentsActions.addComment,
    modifiComment: commentsActions.modifiComment,
    deleteComment: commentsActions.deleteComment,
    itinerariesByCity: itinerariesActions.itinerariesByCity
}

export default connect(mapStateToProps, mapDispatchToProps)(MakeComments);