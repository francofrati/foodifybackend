const Restaurant = require('../models/Restaurant')

const createRestaurant = async (req, res) => {
    const { username, name, email, password, image, country,plus,delivery,online_payment } = req.body
    
    try {
        const checkEmail = await Restaurant.findOne({ email: email })

        if (checkEmail) throw Error(`El email: ${email} ya corresponde a un restaurante.`)

        const newRestaurant = await Restaurant.create({
            username,
            name,
            email,
            hashPassword: password,
            image,
            country,
            plus,
            delivery,
            online_payment
        })

        return res.status(200).send(newRestaurant)

    } catch (error) {
        return res.status(409).send({
            Codigo: 409,
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

module.exports = {
    createRestaurant,
    getAllRestaurants,
    getOneRestaurant
}