import axios from "axios";
import Swal from "sweetalert2"

const userActions ={
    
    signUpUser: (userData) => {
        return async (dispatch, getState) =>{

            const res = await axios.post('http://localhost:4000/api/auth/signup', { userData })
            dispatch({ type: "message", payload: res.data });
                        console.log(res.data)
        



            try{
                
                console.log(userData)

                if(res.data.success){

                    dispatch({ type: "user", payload: res.data });
                        console.log(res.data)
                    Swal.fire({
                        title:`Hello ${res.data.firstName || userData.firstName} remember to verify your account`,
                        icon: 'success',
                        toast:true,
                        position:'center',
                        background:'#fff'
                    })
            

                }
                // else{
                //     Swal.fire({
                //         title:`You are already registered`,
                //         icon: 'error',
                //         toast:true,
                //         position:'center',
                //         background:'#fff'
                //     })
                // }



            }catch(error){console.log(error)}


        }
    },

    logInUser: (logedUser) => {

        return async (dispatch, getState) => {

            try{

                const user = await axios.post('http://localhost:4000/api/auth/login', { logedUser })
                console.log(user.data)

                if(user.data.success){
                
                    
                    localStorage.setItem('token',user.data.response.token)
                dispatch({type: 'user', payload: user.data.response.userData || user.data.response.logedUser});
                console.log(user.data.message)

                Swal.fire({
                    title:`Welcome back ${user.data.response.userData.firstName || logedUser.firstName}!`,
                    icon: 'success',
                    toast:true,
                    position:'center',
                    background:'#fff'
                })

                }
                // else{console.log(user.data.message)
                
                //     Swal.fire({
                //         title:`You are already logged in`,
                //         icon: 'success',
                //         toast:true,
                //         position:'center',
                //         background:'#fff'
                //     })
                
                // }


            }catch(error){console.log(error)}
            
        
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