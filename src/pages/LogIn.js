import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions"
import { Link } from 'react-router-dom'
import axios from "axios";
import {HiOutlineMail} from "react-icons/hi"
import {GoLock} from "react-icons/go"


const LogIn= (props) => {

const handleSubmit = (event) => {
    event.preventDefault()
    const logedUser={
        email:event.target[0].value,
        password:event.target[1].value,
        from:"form-signup"
    }
    props.logInUser(logedUser)
}


return ( 
    <>
         <div className="d-flex justify-content-center">
        <div className="hola">
            <div>
                <h2>Log In</h2>
            </div>
            <div >
            <form onSubmit={handleSubmit}>    
                <div className="mb-3 mt-3">
                {/* <label className="labelLogin">Email:</label> */}
                <HiOutlineMail className="labelLogin"/>
                <input type="email" placeholder="email" name="email"/>
                </div>
                <div className="mb-3 labelLogin">
                {/* <label className="labelLogin">Password:</label> */}
                <GoLock className="labelLogin"/>
                <input type="password" placeholder="password" name="password"/>
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