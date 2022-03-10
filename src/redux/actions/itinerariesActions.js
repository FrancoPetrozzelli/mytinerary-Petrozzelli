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
    }


} 
export default itinerariesActions 