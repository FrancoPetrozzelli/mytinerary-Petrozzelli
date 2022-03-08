

const initialState = {

    allMyItineraries:[],
    itinerariesByCity:[]

} 

const itinerariesReducer = (state = initialState, action) => {

    switch (action.type) {

        case "allMyItinerariesReducer":
            
            return {
                ...state,
                allMyItineraries: action.payload
            }

        case "itinerariesByCityReducer":

            return {
                ...state,
                itinerariesByCity: action.payload
            }

            default:
                return state
    }
}

export default itinerariesReducer;