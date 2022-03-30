import axios from "axios";

const citiesActions = { //es un objeto q tiene funcones

    allCities: () =>{
        return async(dispatch, getState) => {
            const response = await axios.get('https://mytinerary-petrozzelli.herokuapp.com/api/allcities')
            //.then(response => console.log(response.data.response))
            dispatch({type:'allMyCitiesReducer', payload:response.data.response})
        } 
    },

    citiesFilter: (value) =>{
        return (dispatch) => {
            dispatch({type:'filterCitiesReducer', payload:value})
        }
    },


    cityById: (id) =>{
        return async(dispatch, getState) => {
            const response = await axios.get(`https://mytinerary-petrozzelli.herokuapp.com/api/city/${id}`)
            //.then(response => ))
            //console.log(response.data.response)
            dispatch({type:'cityReducer', payload:response.data.response})
        } 
    },




} 
export default citiesActions 