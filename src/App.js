import Home from './pages/Home';
import Cities from './pages/Cities';
import NavbarMain from './components/NavBar'
import FooterMain from './components/Footer'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Error404 from './components/Error404'
import axios from 'axios'
import React, {useEffect, useState} from 'react'

function App() {
//   const [apidata, setApiData ]= useState([])

// useEffect(()=>{

//   axios.get(`http://localhost:4000/api/allcities`)
//   .then(response=>console.log(response.data.response.myCities))

// },[])

  return (
    <BrowserRouter>
    
    <NavbarMain/>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cities' element={<Cities/>}/>
      <Route path='*' element={<Error404/>}/>

    </Routes>

    <FooterMain/>
    
    </BrowserRouter>

  );
}

export default App;
