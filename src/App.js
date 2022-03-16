import Home from './pages/Home';
import Cities from './pages/Cities';
import NavbarMain from './components/NavBar'
import FooterMain from './components/Footer'
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Error404 from './components/Error404'
import axios from 'axios'
import React, {useEffect, useState} from 'react'
import CityDetails from './components/CityDetails'
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

function App() {


  return (
    <BrowserRouter>
    
    <NavbarMain/>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cities' element={<Cities/>}/>
      <Route path ="/detalle/:id" element={<CityDetails/>}/>
      <Route path='*' element={<Error404/>}/>
      <Route path='/login' element={<LogIn/>}/>
      <Route path='/signup' element={<SignUp/>}/>

    </Routes>

    <FooterMain/>

    </BrowserRouter>

  );
}

export default App;
