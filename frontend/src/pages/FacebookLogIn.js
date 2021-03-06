import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';

function FacebookLogIn(props) {

const responseFacebook = async (res) => {
    
    
    console.log(res)
    const logedUser = {
    email: res.email,
    password: res.id,
    from: "facebook",
    
    }
    await props.logInUser(logedUser)
}

return (
    <FacebookLogin
    cssClass="buttonsocial my-facebook-button-class"
    icon="fa-facebook"
    textButton=" with Facebook"
    appId="378809110472972"
    autoLoad={false}
    fields="name,email,picture"
    callback={responseFacebook}

    />
  );
}
const mapDispatchToProps = {
    logInUser: userActions.logInUser,

}

export default connect(null, mapDispatchToProps)(FacebookLogIn);