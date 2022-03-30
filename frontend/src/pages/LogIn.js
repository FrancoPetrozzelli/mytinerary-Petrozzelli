import React from "react";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions"
import { Link } from 'react-router-dom'
import {HiOutlineMail} from "react-icons/hi"
import {GoLock} from "react-icons/go"
import FacebookLogIn from "./FacebookLogIn";
import Swal from "sweetalert2"
import { useState } from "react";


const LogIn= (props) => {

    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

const handleSubmit = (event) => {
    event.preventDefault()

    if([email,password].includes('')){

        Swal.fire({
            title:"You didn't complete all the fields",
            icon: 'error',
            toast:true,
            position:'center',
            background:'#fff'
        })
        
        

    }else{

        const logedUser={
            email:event.target[0].value,
            password:event.target[1].value,
            from:"form-signup"
        }
        props.logInUser(logedUser)


    }


}



return ( 
    <>
        <div className="d-flex justify-content-center">
        <div className="logincontainer">
            <div>
                <h2>LOG IN</h2>
                <FacebookLogIn/>
            </div>
            <div >
            <form onSubmit={handleSubmit}>    
                <div className="mb-3 mt-3">
                {/* <label className="labelLogin">Email:</label> */}
                <HiOutlineMail className="labelLogin"/>
                <input className="inputLogIn" type="email" placeholder="email" name="email" value={email} onChange={ e => setEmail(e.target.value) }/>
                </div>
                <div className="mb-3">
                {/* <label className="labelLogin">Password:</label> */}
                <GoLock className="labelLogin"/>
                <input className="inputLogIn" type="password" placeholder="password" name="password" value={password} onChange={ e => setPassword(e.target.value) }/>
                </div>
                <button type="submit" className="btn btn-primary btn-block">Log In</button>
            </form>
            </div>
            <div>
                <p>Don't have an account? Sign up <Link to="/signup">Here</Link></p>
            </div>
        </div>
        </div>
        </>
)
}

    const mapDispatchToProps = {
        logInUser: userActions.logInUser
    }

export default connect(null, mapDispatchToProps)(LogIn);