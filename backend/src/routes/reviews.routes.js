const { Router } = require('express')
const Restaurant = require('../models/Restaurant')

const Review = require('../models/Review')
const User = require('../models/User')


const router = Router()

router.get('/', async (req, res) => {
    try {
        const reviews = await Review.find()

        return res.status(200).send({
            status: true,
            reviews,
            msg: 'Se enviaron todas las reviews'
        })
    } catch (error) {
        return res.status(400).send({
            status: false,
            msg: error.message
        })
    }
})

router.get('/user', async (req, res) => {

    const { userId } = req.query

    try {
        const reviews = await Review.find({ user_id: userId })

        return res.status(200).send({
            status: true,
            reviews,
            msg: `Se enviaron todas las reviews del usuario con id: ${userId}`
        })
    } catch (error) {
        return res.status(400).send({
            status: false,
            msg: error.message
        })
    }
})

router.get('/restaurant', async (req, res) => {

    const { restId } = req.query

    try {
        const reviews = await Review.find({ restaurant_id: restId })

        return res.status(200).send({
            status: true,
            reviews,
            msg: `Se enviaron todas las reviews del negocio con id: ${restId}`
        })
    } catch (error) {
        return res.status(400).send({
            status: false,
            msg: error.message
        })
    }
})

router.post('/', async (req, res) => {
    const { restId, userId, content, rate } = req.body

    try {

        const user = await User.findOne({ _id: userId })

        if (!user) throw Error(`No se encontro el usuario con id: ${userId}`)

        const restaurant = await Restaurant.findOne({ _id: restId })

        if (!restaurant) throw Error(`No se encontro el negocio con id: ${restId}`)

        if(!rate)throw Error('Se requiere una puntuacion')

        const review = await Review.create({
            user_id: user._id,
            restaurant_id: restaurant._id,
            content,
            rate
        })

        await User.findByIdAndUpdate(
            {
                _id:userId
            },
            {
                $push:{reviews:review._id}
            }
        )

        await Restaurant.findByIdAndUpdate(
            {
                _id:restId
            },
            {
                $push:{reviews:review._id}
            }
        )

        return res.status(200).send({
            status: true,
            review,
            msg: `El usuario con id: ${userId} creo una review para el negocio con id: ${restId} exitosamente `
        })
    } catch (error) {
        return res.status(400).send({
            status: false,
            msg: error.message
        })
    }
})


module.exports = router