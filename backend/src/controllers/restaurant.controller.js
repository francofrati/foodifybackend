const bcrypt = require('bcrypt')

const Restaurant = require('../models/Restaurant')

const { sendEmail } = require('../lib/user.controller.helper')


const createRestaurant = async (req, res) => {

    const { delivery_time,rating, name, email, password, image, country,plus,delivery,online_payment } = req.body
    
    try {
        const checkEmail = await Restaurant.findOne({ email: email })

        if (checkEmail) throw Error(`El email: ${email} ya corresponde a un restaurante.`)

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(password, salt)

        const newRestaurant = await Restaurant.create({
            name,
            email,
            password:hash,
            image,
            country,
            plus,
            delivery,
            online_payment,
            rating,     
            delivery_time       
        })

        sendEmail(email,name)

        return res.status(200).send(newRestaurant)

    } catch (error) {
        return res.status(409).send({
            Codigo: 409,
            Error: error.message
        })
    }
}

const loginRestaurant = async(req,res)=>{

    const { email, password } = req.body
    try {

        const currentRestaurant = await Restaurant.findOne({ email: email })

        if (!currentRestaurant) {
            throw Error(`El email: ${email} no corresponde a ningun negocio.`)
        }

        

        const isCorrectPassword = await bcrypt.compare(password, currentRestaurant.password)
        
        if (currentRestaurant && !isCorrectPassword) {
            throw Error('Contraseña incorrecta')
        }

        
        const token = createToken({
            name: currentRestaurant.name,
            id:currentRestaurant.id,
            email,
            type: 'restaurant'
        })

        return res.status(201).json({
            logged_restaurant: currentRestaurant,
            token
        })

    } catch (error) {
        return res.status(404).send({
            Codigo: 404,
            Error: error.message
        })
    }
}

const getAllRestaurants = async (req, res) => {

    res.send(await Restaurant.find())

}

const getOneRestaurant = async (req, res) => {
    const { id } = req.params
    
    try {
        const restaurant = await Restaurant.findOne({ _id: id })

        if (!restaurant) throw Error(`El id: ${id} no corresponde a ningun restaurante.`)
        
        return res.send(restaurant)

    } catch (error) {

        return res.status(404).send({
            Codigo: 404,
            Error: error.message
        })

    }

}

const getAuth = async(req,res)=>{
    const { token } = req.body

    try {

        const decodedToken = validateToken(token)

        return res.send(decodedToken)

    } catch (error) {
        return res.status(400).send({
            Codigo: 400,
            Error: error.message
        })
    }
}

module.exports = {
    createRestaurant,
    getAllRestaurants,
    getOneRestaurant,
    getAuth,
    loginRestaurant
}