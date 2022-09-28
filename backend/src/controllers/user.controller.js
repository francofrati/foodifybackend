const jwt = require('jsonwebtoken')

const User = require("../models/User")
const { createToken } = require("../lib/user.controller.helper")



const signUp = async (req, res) => {
    const { email, username, name, password } = req.body

    try {
        const currentUser = await User.findOne({ email: email })

        if (currentUser) throw Error(`El email: ${email} ya corresponde a un usuario`)

        const newUser = await User.create({
            email,
            username,
            name,
            password
        })

        const token = createToken(newUser)

        return res.status(201).send({
            created_user: newUser,
            token,
        })

    } catch (error) {
        return res.status(409).send({
            Codigo: 409,
            Error: error.message
        })
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {

        const currentUser = await User.findOne({ email: email })
        console.log(currentUser.hashPassword)

        if (!currentUser) {
            throw Error(`El email: ${email} no corresponde a ningun usuario.`)
        }

        //RESOLVER POR QUE NO TRAE LA CONTRASEÑNA DESDE LA DB

        // const isCorrectPassword = currentUser.hashPassword === password
        //     ? true
        //     : false


        // if (currentUser && !isCorrectPassword) {
        //     throw Error('Contraseña incorrecta')
        // }

        //Si coincide email con contraseña entonces creo jwt y la envio.
        const token = createToken(currentUser)
        return res.status(201).json({ 
            logged_user: currentUser,
            token 
        })

    } catch (error) {
        return res.status(404).send({
            Codigo: 404,
            Error: error.message
        })
    }

}
module.exports = {
    signUp,
    login
}