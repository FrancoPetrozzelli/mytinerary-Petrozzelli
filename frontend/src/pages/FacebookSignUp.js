import React from 'react';
import FacebookLogin from 'react-facebook-login';
import { connect } from 'react-redux';
import userActions from '../redux/actions/userActions';

function FacebookSignUp(props) {

const responseFacebook = async (res) => {
    console.log(res)
    console.log(res.name)
    const fullNameSeparado = res.name.split(" ")
    console.log(fullNameSeparado)


    const userData = {
    firstName:fullNameSeparado[0],
    lastName:fullNameSeparado[1],
    email: res.email,
    password: res.id,
    imageUrl: res.picture.data.url,
    country:"facebook",
    from: "facebook",
    }
    await props.signUpUser(userData)
}

return (
    <FacebookLogin
    cssClass="buttonsocial my-facebook-button-class"
    icon="fa-facebook"
    textButton=" Sign up with Facebook"
    appId="378809110472972"
    autoLoad={false}
    fields="name,email,picture"
    scope='public_profile, email'
    returnScopes={true}
    callback={responseFacebook}

    />
  );
}
const mapDispatchToProps = {
signUpUser: userActions.signUpUser,

}

export default connect(null, mapDispatchToProps)(FacebookSignUp);