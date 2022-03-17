import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import userActions from "../redux/actions/userActions"
import { Link } from 'react-router-dom'
import axios from "axios";
import { FaUser } from "react-icons/fa";
import {HiUserGroup, HiOutlineMail} from "react-icons/hi"
import {GoLock} from "react-icons/go"
import {BsFillImageFill} from "react-icons/bs"
import {BiWorld} from "react-icons/bi"


function SignUp(props){

const handleSubmit = (event) => {
    event.preventDefault()
    const userData={
        firstName:event.target[0].value,
        lastName:event.target[1].value,
        email:event.target[2].value,
        password:event.target[3].value,
        imageUrl:event.target[4].value,
        country:event.target[5].value,
        from:"form-signup"
    }
    props.signUpUser(userData)
}


    const [countries, setCountries] = useState([])

    useEffect(

        () => {

            axios.get('https://restcountries.com/v2/all?fields=name')
            .then(response => setCountries(response.data))

        }, []

    )





return ( 
    
        <div className="d-flex justify-content-center align-items-center">
        <div className="hola containertodo">
        <div className="chau">
            <div>
                <h2>Sign Up</h2>
            </div>
            <form onSubmit={handleSubmit} className="formContainer">   

                    <div className="mb-3 mt-3">
                {/* <label className="labelLogin">First Name</label> */}
                <FaUser className="labelLogin"/>
                <input type="text" placeholder="First Name" name="firstName"/>
                    </div>

                    <div className="mb-3 mt-3">
                {/* <label className="labelLogin">Last Name</label> */}
                <HiUserGroup className="labelLogin"/>
                <input type="text" placeholder="Last Name" name="lastName"/>
                    </div>

                    <div className="mb-3 mt-3">
                {/* <label className="labelLogin">Email</label> */}
                <HiOutlineMail className="labelLogin"/>
                <input type="email" placeholder="email@email.com" name="email"/>
                    </div>

                <div className="mb-3 mt-3">
                {/* <label className="labelLogin">Password:</label> */}
                <GoLock className="labelLogin"/>
                <input type="password" placeholder="password" name="password"/>
                </div>

                    <div className="mb-3 mt-3">
                {/* <label className="labelLogin">Url Image</label> */}
                <BsFillImageFill className="labelLogin"/>
                <input type="url" placeholder="url profile image" name="imageUrl"/>
                    </div>

    <div className="countrycontainer">

                    <div className="mb-3 mt-3">
                        <BiWorld className="labelLogin"/>
                                    <select name="country" className="country">
                                        <option className="countryoption">Choose your country...</option>
                {countries.map(country =>(
                    <option value={country.name}>{country.name}</option>
                    ))}
                                    </select>
                    </div>

                    </div>


                    <div>
                <button type="submit" className="btn btn-primary btn-block">Log In</button>
                    </div>

            <div>
                <p>You have an account? Log In <Link to="/login">Here</Link></p>
            </div>





        </form>

            </div>
        </div>
        </div>
        
)
}

    const mapDispatchToProps = {
        signUpUser: userActions.signUpUser
    }

export default connect(null, mapDispatchToProps)(SignUp);