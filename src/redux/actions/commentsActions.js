import axios from 'axios';

const commentsActions = {

    addComment: (comment) => {
     
        return async (dispatch, getState) => {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.post('http://localhost:4000/api/itineraries/comment', { ...comment }, {
                                                
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return {success:true}
        }
                
            catch (error) {
                return {success:false, error:error.message}
            }
        }
    },
    modifiComment: (comment) => {
        
        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.post('http://localhost:4000/api/itineraries/comment/'+ comment.commentID,  {comment: comment.comment} , {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })

            return res
        }
    },
    deleteComment: (id) => {

        const token = localStorage.getItem('token')
        return async (dispatch, getState) => {
            const res = await axios.delete(`http://localhost:4000/api/itineraries/comment/${id}`, {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: res.data.message,
                    success: res.data.success
                }
            })
            return res
        }
    },

}

export default commentsActions;