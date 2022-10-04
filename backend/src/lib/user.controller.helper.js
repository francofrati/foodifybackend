require('dotenv').config()

const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken')

const { SECRET } = process.env


const getByName = ({ users, name }) => {
    return users.filter((user) =>
        user.name?.toLowerCase().includes(name.toLowerCase())
    )
}

const getByEmail = ({ users, email }) => {
    return users.filter((user) =>
        user.email?.toLowerCase().includes(email.toLowerCase())
    )
}

const createToken = (user) => {
    const { id, name, email, type } = user
    console.log(id, type)
    const payload = {
        id,
        name,
        email,
        type
    }
    return jwt.sign(payload, SECRET, { expiresIn: '3d' })
}

const validateToken = (token) => {
    try {
        const decodedToken = jwt.verify(token, SECRET)

        return decodedToken

    } catch (error) {
      
        return {
            error: error.message
        }
        
    }

}


//------------------------------------------------CONFIG DE MAILS----
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // upgrade later with STARTTLS
    auth: {
        user: "francofraticelli41@gmail.com",
        pass: "ajnrwmsloiismihj",
    },
})

const sendEmail = async(email,firstName)=>{
    await transporter.sendMail({
        from: '"😎Foodify😎" <francofraticelli41@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Bienvenido a Foodify", // Subject line
        html: `<b>Hola ${firstName}👽 Gracias por registrarte. Ingresa al siguiente link para confirmar tu cuenta: helloworld.com </b>`, // html body
      })
}

transporter.verify()
    .then(() => {
        console.log('nodemailer is ready')
    })
//---------------------------------------------------FIN CONFIG DE MAILS----
module.exports = {
    createToken,
    validateToken,
    getByName,
    getByEmail,
    sendEmail
}