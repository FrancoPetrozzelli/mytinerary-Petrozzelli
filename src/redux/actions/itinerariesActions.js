import axios from "axios";

const itinerariesActions = { //es un objeto q tiene funcones

    allItineraries: () =>{
        return async(dispatch, getState) => {
            const response = await axios.get('http://localhost:4000/api/itineraries')
            dispatch({type:'allMyItinerariesReducer', payload:response.data.response})
            //console.log(response.data.response)

        } 


    },

    itinerariesByCity: (cityid) => {
        return async (dispatch, getState) => {
            const response = await axios.get(`http://localhost:4000/api/itineraries/${cityid}`)
            //console.log(response)
            dispatch({type:'itinerariesByCityReducer', payload:response.data.response})
        }
    },


    likeDislike: (cityid) => {
        return async () => {
        const token = localStorage.getItem('token')
            try {
                let response = await axios.put(`http://localhost:4000/api/itineraries/like/${cityid}`, {},
                {headers: {
                    Authorization: "Bearer "+token
                    }
                })
                console.log(response)
                return response
                
            }catch (error) {
                console.log(error)
            }
        }
    },

    getActivityByItineraryId: (id) =>{

        return async () => {
            try { 
                const response = await axios.get(`http://localhost:4000/api/itineraryactivity/${id}`)
                const data = response.data.response
                return {success: true, response: data}
            } catch (error){
                return {
                    success: false, response: error
                }
            }
        }


    }


} 
export default itinerariesActions 