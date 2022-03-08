

const initialState = {

    allCities:[],
    filterCitiesState:[],
    specificCity:{}
} 

const citiesReducer = (state = initialState, action) => {

    switch (action.type) {

        case "allMyCitiesReducer":
            
            return {
                ...state,
                allCities: action.payload,
                filterCitiesState: action.payload
            }

            case "filterCitiesReducer":
            
                let filterCities = state.allCities.filter((searchFilter) => (searchFilter.place.toLowerCase().startsWith(action.payload.toLowerCase().trim())))
                            console.log(filterCities)
                            return {
                                ...state, 
                                filterCitiesState : filterCities
                            }

            case "cityReducer":
                return{
                    ...state,
                    specificCity: action.payload
                }



            default:
                return state
    }
}

export default citiesReducer;