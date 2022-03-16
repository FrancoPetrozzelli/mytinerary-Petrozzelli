import axios from "axios";

const userActions ={
    
    signUpUser: (userData) => {
        return async (dispatch, getState) =>{

            const res = await axios.post('http://localhost:4000/api/auth/signup', { userData })
            console.log(res.data)

        }
    },

    signInUser: (logedUser) => {

        return async (dispatch, getState) => {
            const user = await axios.post('http://localhost:4000/api/auth/login', { logedUser })
            if(user.data.succes){
                dispatch({type: 'user', payload: user.data.response.userData});
            }else{console.log(user.data.message)}
        }
    },

    logOutUser :(closeuser)=>{
        return async (dispatch, getState) => {
        const user = axios.post('http://localhost:4000/api/auth/signOut',{closeuser})
        dispatch({type: 'user', payload: null});
    } 
}


}

export default userActions 