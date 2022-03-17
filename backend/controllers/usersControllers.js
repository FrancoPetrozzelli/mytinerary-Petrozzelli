const User = require('../models/usersModels')
const bcryptjs = require('bcryptjs')
const crypto = require('crypto')        
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const sendEmail = async (email, uniqueString) => { //FUNCION ENCARGADA DE ENVIAR EL EMAIL

    const transporter = nodemailer.createTransport({ //DEFINIMOS EL TRASPORTE UTILIZANDO NODEMAILER
        host: 'smtp.gmail.com',         //DEFINIMOS LO PARAMETROS NECESARIOS
        port: 465,
        secure: true,
        auth: {
            user: "usermailverifyPetrozzelli@gmail.com",    //DEFINIMOS LOS DATOS DE AUTORIZACION DE NUESTRO PROVEEDOR DE
            pass: "petromindhub2022"                          //COREO ELECTRONICO, CONFIGURAR CUAENTAS PARA PERMIR EL USO DE APPS
        }                                               //CONFIGURACIONES DE GMAIL
    })

    // EN ESTA SECCION LOS PARAMETROS DEL MAIL 
    let sender = "usermailverifyPetrozzelli@gmail.com"  
    let mailOptions = { 
        from: sender,    //DE QUIEN
        to: email,       //A QUIEN
        subject: "Verificacion de email usuario ", //EL ASUNTO Y EN HTML EL TEMPLATE PARA EL CUERPO DE EMAIL Y EL LINK DE VERIFICACION
        html: `
        <div >
        <h1 style="color:red">Presiona <a href=http://localhost:4000/api/verify/${uniqueString}>aqui</a> para confirma tu email. Gracias </h1>
        </div>
        `
    
    };
    await transporter.sendMail(mailOptions, function (error, response) { //SE REALIZA EL ENVIO
        if (error) { console.log(error) }
        else {
            console.log("Mensaje enviado")

        }
    })
};


const usersController = {

    verifyEmail: async (req, res) => {

        const { uniqueString } = req.params; //EXTRAE EL EL STRING UNICO DEL LINK

        const user = await User.findOne({ uniqueString: uniqueString })
        console.log(user) //BUSCA AL USUARIO CORRESPONDIENTE AL LINK
        if (user) {
            user.verifiedEmail = true //COLOCA EL CAMPO emailVerified en true
            await user.save()
            res.redirect("http://localhost:3000/login") //REDIRECCIONA AL USUARIO A UNA RUTA DEFINIDA
            //return  res.json({success:true, response:"Su email se ha verificado correctamente"})
        }
        else { res.json({ success: false, response: "Su email no se ha verificado" }) }
    },

    signUpUsers:async (req,res)=>{

        let {firstName, lastName, email, password, imageUrl, country, from } = req.body.userData

        try {
    
            

            const userExist = await User.findOne({ email })
            
            if (userExist) {
                
                if (userExist.from.indexOf(from) !== -1) { 

                    res.json({ success: false, from:"signup", message: "User is already registered, please log in" })

                } else {
                    const hashedPassword = bcryptjs.hashSync(password, 10)
                    userExist.from.push(from)
                    userExist.password.push(hashedPassword) 
                    if(from === "form-signup"){ 
                        userExist.uniqueString = crypto.randomBytes(15).toString('hex') 
                        //PORSTERIORMENTE AGREGAREMOS LA VERIFICACION DE EMAIL
                        await userExist.save()
                        await sendEmail(email, userExist.uniqueString)
    
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
                    from:[from],
                    verifiedEmail:false,
                    uniqueString:crypto.randomBytes(15).toString('hex'),
                })
            
                //SE LO ASIGNA AL USUARIO NUEVO
                if (from !== "form-signup") { //SI LA PETICION PROVIENE DE CUENTA GOOGLE
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
                    await sendEmail(email, newUser.uniqueString) 
    
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
                if (from !== "form-signup") { 
                    
                    let passwordMatch =  userExist.password.filter(pass =>bcryptjs.compareSync(password, pass))
                    
                    if (passwordMatch.length >0) { //TERERO VERIFICA CONTRASEÑA

                        const userData = {
                                        id:userExist._id,
                                        firstName: userExist.firstName,
                                        email: userExist.email,
                                        imageUrl: userExist.imageUrl,
                                        from:userExist.from
                                        }
                        await userExist.save()

                        const token = jwt.sign({...userData}, process.env.SECRET_KEY,{expiresIn:  60* 60*24 })

                        res.json({ success: true, 
                                from:from,
                                response: {token, userData }, 
                                message:"Bienvenido nuevamente "+userData.firstName,
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
                            id:userExist._id,
                            firstName: userExist.firstName, 
                            email: userExist.email,
                            imageUrl: userExist.imageUrl,
                            from:userExist.from
                            }

                            const token = jwt.sign({...userData}, process.env.SECRET_KEY, {expiresIn:  60* 60*24 })
                        
                        res.json({ success: true, 
                            from: from, 
                            response: {token, userData }, 
                            message:" Bienvenido nuevamente "+userData.firstName,
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
    },


    TokenVerify:(req, res) => {
        console.log(req.user)
        if(!req.err){
        res.json({success:true,
                response:{id:req.user.id, firstName:req.user.firstName, lastName:req.user.lastName, imageUrl:req.user.imageUrl, email:req.user.email, from:"token"},
                message:"Bienvenido nuevamente "+req.user.firstName}) 
        }else{
            res.json({success:false,
            message:"Por favor realiza nuevamente signIn"}) 
        }
    }

}
module.exports = usersController