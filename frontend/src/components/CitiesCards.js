import { Link as LinkRouter } from "react-router-dom";
import Button from "react-bootstrap/Button";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { UilSearch } from '@iconscout/react-unicons'
import SearchNotFound from "./SearchNotFound"
import { connect } from "react-redux";
import citiesActions from "../redux/actions/citiesActions";

const CitiesCards = (props) => {


  // get my cards //
useEffect( () =>{
    props.allCities()

},[]
)
const [] = useState()

const filter = (event) => {

    props.citiesFilter(event.target.value);
    //console.log(event.target.value)

}


//console.log(props)


    return (
    <>
      {/* // search // */}

    <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="search-box">
        <button className="btn-search">
        <UilSearch/>
        </button>
        <input
            type="text"
            className="input-search"
            placeholder="Type to Search a City..."
            onChange={filter}
        />
        </div>
    </div>


      {/* // CARDS // */}

    <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-3 g-3 justify-content-center mb-5">
        {props.filterCitiesState.length !== 0 ? (
            props.filterCitiesState.map((city) => (
            <div className="col" key={city._id}>
                <div className="cardcities h-100 shadow-sm">
                {" "}
                <img
                    src={process.env.PUBLIC_URL + "/assets/" + city.image}
                    className="card-img-top"
                    alt="city"
                />
                <div className="card-body">
                    <div className="">
                    {" "}
                    <p className="text-center fw-bold fs-5">
                    {city.place}
                        </p>{" "}
                    </div>
                    <div className="">
                    {" "}
                    <p className="text-center fw-bold">{city.country}</p>{" "}
                    </div>
                    <h6 className="card-title card-description fs-5 fs-responsive">
                    {city.description}
                    </h6>
                    <div className="text-center my-4">
                    {" "}
                    <LinkRouter to={`/detalle/${city._id}`}>
                        {" "}
                        <Button className=" btn btn-details btn-warning btn-details-warning">
                        Details
                        </Button>{" "}
                    </LinkRouter>
                    </div>
                </div>
                </div>
            </div>
            ))
        ) : 
        <SearchNotFound/>
        }
        </div>
    </>
    );
};

const mapStateToProps = state => { // se manejan los reducer
    return {

        filterCitiesState: state.citiesReducer.filterCitiesState,
        //todaslasciudades: state.citiesReducer.allCities
        

    }
}

const mapDispatchToProps = { //aca se manejan las acciones

    allCities: citiesActions.allCities,
    citiesFilter: citiesActions.citiesFilter



}

export default connect(mapStateToProps, mapDispatchToProps)(CitiesCards); 




































// WITHOUT REDUX

// import { Link as LinkRouter } from "react-router-dom";
// import Button from "react-bootstrap/Button";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { UilSearch } from '@iconscout/react-unicons'
// import SearchNotFound from "./SearchNotFound"

// const CitiesCards = () => {
//   const [cities, setCities] = useState([]); //es la impresion dinamica de mis cards
//   const [printCities, setPrintCities] = useState([]); //impresion basado en el search
//   const [search, setSearch] = useState(""); //busqueda del search

//   // get my cards //

// const api = async () => {
//     await axios
//     .get(`http://localhost:4000/api/allcities`)
//     .then((response) => {
//         //console.log(response.data.response.myCities[0].country)
//         setCities(response.data.response.myCities);
//         setPrintCities(response.data.response.myCities);
//     })
//     .catch((error) => {
//         console.log(error);
//     });
// };

//   // get user search value //
// const getSearch = (e) => {
//     setSearch(e.target.value);
//     filterSearch(e.target.value);
// };

//   // filtro del search //

// const filterSearch = (searchtext) => {
//     let searchResult = printCities.filter((searchFilter) => {
//     if (
//         searchFilter.place
//             .toString()
//             .toLowerCase()
//             .startsWith(searchtext.toLowerCase().trim())
//         ) {
//         return searchFilter;
//         }
//     });
//     setCities(searchResult);
// };

// useEffect(() => {
//     api();
//     }, []);

//     return (
//     <>
//       {/* // search // */}

//     <div className="d-flex justify-content-center align-items-center mt-3">
//         <div className="search-box">
//         <button className="btn-search">
//         <UilSearch/>
//         </button>
//         <input
//             type="text"
//             className="input-search"
//             placeholder="Type to Search a City..."
//             value={search}
//             onChange={getSearch}
//         />
//         </div>
//     </div>


//       {/* // CARDS // */}

//     <div className="row row-cols-1 row-cols-xs-2 row-cols-sm-2 row-cols-lg-3 g-3 justify-content-center mb-5">
//         {cities.length !== 0 ? (
//             cities.map((city) => (
//             <div className="col" key={city._id}>
//                 <div className="cardcities h-100 shadow-sm">
//                 {" "}
//                 <img
//                     src={process.env.PUBLIC_URL + "/assets/" + city.image}
//                     className="card-img-top"
//                     alt="city"
//                 />
//                 <div className="card-body">
//                     <div className="">
//                     {" "}
//                     <p className="text-center fw-bold fs-5">
//                     {city.place}
//                         </p>{" "}
//                     </div>
//                     <div className="">
//                     {" "}
//                     <p className="text-center fw-bold">{city.country}</p>{" "}
//                     </div>
//                     <h6 className="card-title card-description fs-5 fs-responsive">
//                     {city.description}
//                     </h6>
//                     <div className="text-center my-4">
//                     {" "}
//                     <LinkRouter to={`/detalle/${city._id}`}>
//                         {" "}
//                         <Button className=" btn btn-details btn-warning btn-details-warning">
//                         Details
//                         </Button>{" "}
//                     </LinkRouter>
//                     </div>
//                 </div>
//                 </div>
//             </div>
//             ))
//         ) : 
//         <SearchNotFound/>
//         }
//         </div>
//     </>
//     );
// };

// export default CitiesCards;











