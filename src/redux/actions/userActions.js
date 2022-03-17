import axios from "axios";

const userActions ={
    
    signUpUser: (userData) => {
        return async (dispatch, getState) =>{

            const res = await axios.post('http://localhost:4000/api/auth/signup', { userData })
            console.log(res.data)

        }
    },

    logInUser: (logedUser) => {

        return async (dispatch, getState) => {
            const user = await axios.post('http://localhost:4000/api/auth/login', { logedUser })
            if(user.data.success){
                
                localStorage.setItem('token',user.data.response.token)
            dispatch({type: 'user', payload: user.data.response.userData});
            console.log(user.data.message)
            }else{console.log(user.data.message)}
        }
    },

    logOutUser :(closeuser)=>{
        return async (dispatch, getState) => {
        //const user = axios.post('http://localhost:4000/api/auth/signout',{closeuser})
            localStorage.removeItem('token')
        dispatch({type: 'user', payload: null});
    } 
},

TokenVerify: (token) => {

    return async (dispatch, getState) => {
        console.log(token)
        const user = await axios.get('http://localhost:4000/api/auth/signInToken', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        console.log(user)
        
        if (user.data.success) {
            dispatch({ type: 'user', payload: user.data.response });
            dispatch({
                type: 'message',
                payload: {
                    view: true,
                    message: user.data.message,
                    success: user.data.success
                }
            });
        } else {
            localStorage.removeItem('token')
        }

    }
}


}

export default userActions 