import Home from './pages/Home';
import Cities from './pages/Cities';
import NavbarMain from './components/NavBar'
import FooterMain from './components/Footer'
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";
import Error404 from './components/Error404'
import React, {useEffect} from 'react'
import CityDetails from './components/CityDetails'
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';
import userActions from './redux/actions/userActions';
import { connect } from 'react-redux';


function App(props) {


  useEffect(() => {
 
    if(localStorage.getItem('token')!== null){
      const token = localStorage.getItem("token")
      props.TokenVerify(token)
    }
  },[])

  return (
    <BrowserRouter>
    
    <NavbarMain/>

    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/cities' element={<Cities/>}/>
      <Route path ="/detalle/:id" element={<CityDetails/>}/>
      <Route path='*' element={<Error404/>}/>
      {/* <Route path="/login" element={localStorage.getItem('token') ? (<Navigate replace to ="/"/>) : <LogIn/>}/>
			<Route path="/signup" element={localStorage.getItem('token') ? (<Navigate replace to ="/"/>) : <SignUp />}/> */}
      {!props.user &&<Route path="/login" element={<LogIn/>} />}
			{!props.user &&<Route path="/signup" element={<SignUp />} />}

    </Routes>

    <FooterMain/>

    </BrowserRouter>

  );
}

const mapDispatchToProps = {
	TokenVerify: userActions.TokenVerify,

}


const mapStateToProps = (state)=>{
  return{
    user: state.userReducer.user
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(App);
