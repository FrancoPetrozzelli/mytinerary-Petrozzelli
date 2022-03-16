const User = require('../models/usersModels')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')        
const nodemailer = require('nodemailer')
// const jwt = require('jsonwebtoken')


const usersController = {

    signUpUsers:async (req,res)=>{

        let {firstName, lastName, email, password, imageUrl, country, from } = req.body.userData

        try {
    
            

            const userExist = await User.findOne({ email })
            
            if (userExist) {
                
                if (userExist.from.indexOf(from) === 0) { 

                    res.json({ success: false, from:"signup", message: "User is already registered, please log in" })

                } else {
                    const hashedPassword = bcryptjs.hashSync(password, 10)
                    userExist.from.push(from)
                    userExist.password.push(hashedPassword) 
                    if(from === "form-Signup"){ 
                        //PORSTERIORMENTE AGREGAREMOS LA VERIFICACION DE EMAIL
                        await userExist.save()
    
                    res.json({
                        success: true, 
                        from:"signup", //RESPONDE CON EL TOKEN Y EL NUEVO USUARIO
                        message: "Te enviamos un email para validarlo, por favor verifica tu casilla para completar el signUp y agregarlo a tus metodos de SignIN "
                    }) 
                    
                    }else{
                        userExist.save()
                    
                    res.json({ success: true,
                            from:"signup", 
                            message: "Agregamos "+from+ " a tus medios para realizar signIn" })
                }// EN ESTE PUNTO SI EXITE RESPONDE FALSE
            }
            } else {
                //SI EL USUARIO NO ESXITE
            
                const hashedPassword = bcryptjs.hashSync(password, 10) //LO CREA Y ENCRIPTA LA CONTRASEÑA
                // CREA UN NUEVO OBJETO DE PERSONAS CON SU USUARIO Y CONTRASEÑA (YA ENCRIPTADA)
                const newUser = await new User({
                    firstName,
                    lastName,
                    email,
                    password:[hashedPassword],
                    imageUrl,
                    country,
                    verifiedEmail:true,
                    from:[from],
                
                })
            
                //SE LO ASIGNA AL USUARIO NUEVO
                if (from !== "form-Signup") { //SI LA PETICION PROVIENE DE CUENTA GOOGLE
                    await newUser.save()
                    res.json({
                        success: true, 
                        from:"signup",
                        message: "Felicitaciones se ha creado tu usuario con " +from
                    }) // AGREGAMOS MENSAJE DE VERIFICACION
    
                } else {
                    //PASAR EMAIL VERIFICADO A FALSE
                    //ENVIARLE EL E MAIL PARA VERIFICAR
                    await newUser.save()
    
                    res.json({
                        success: true, 
                        from:"signup",
                        message: "Te enviamos un email para validarlo, por favor verifica tu casilla para completar el signUp "
                    }) // AGREGAMOS MENSAJE DE VERIFICACION
                }
            }
        } catch (error) {
            console.log(error)
            res.json({ success: false, message: "Algo a salido mal intentalo en unos minutos" }) //CAPTURA EL ERROR
        }
    },

    logInUser: async (req, res) => {

        const { email, password,  from } = req.body.logedUser
        try {
            const userExist = await User.findOne({ email })

            if (!userExist) {// PRIMERO VERIFICA QUE EL USUARIO EXISTA
                res.json({ success: false, message: "Tu usuarios no a sido registrado realiza signIn" })

            } else {
                if (from !== "form-Signin") { 
                    
                    let passwordMatch =  userExist.password.filter(pass =>bcryptjs.compareSync(password, pass))
                    
                    if (passwordMatch.length >0) { //TERERO VERIFICA CONTRASEÑA

                        const userData = {
                                        firstName: userExist.firstName,
                                        email: userExist.email,
                                        from:userExist.from
                                        }
                        await userExist.save()

                        res.json({ success: true, 
                                from:from,
                                response: {userData }, 
                                message:"Bienvenido nuevamente "+userData.fullName,
                                })

                    } else {
                        res.json({ success: false, 
                            from: from, 
                            message:"No has realizado el registro con "+from+"si quieres ingresar con este metodo debes hacer el signUp con " +from
                        })
                    }
                } else { 
                    if(userExist.verifiedEmail){
                        let passwordMatch =  userExist.password.filter(pass =>bcryptjs.compareSync(password, pass))
                        if(passwordMatch.length >0){
                        const userData = {
                            fullName: userExist.fullName, 
                            email: userExist.email,
                            from:userExist.from
                            }
                        
                        res.json({ success: true, 
                            from: from, 
                            response: {userData }, 
                            message:"Bienvenido nuevamente "+userData.fullName,
                        })
                        }else{
                            res.json({ success: false, 
                                from: from,  
                                message:"El usuario o el password no coinciden",
                            })
                        }
                    }else{
                        res.json({ success: false, 
                            from: from, 
                            message:"No has verificado tu email, por favor verifica ti casilla de emails para completar tu signUp"
                        }) 
                    }

                } //SI NO ESTA VERIFICADO
            }

        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "Algo a salido mal intentalo en unos minutos" })
        }
    },
    signOutUser: async (req, res) => {
    
        const email = req.body.closeuser
        const user = await User.findOne({ email })
        await user.save()
        res.json(console.log('sesion cerrada ' + email))
    }

}
module.exports = usersController