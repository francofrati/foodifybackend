const { Router } = require('express')
const mongoose = require('mongoose')


const Order = require('../models/Order')
const Food = require('../models/Food')
const Restaurant = require('../models/Restaurant')
const bcrypt = require('bcrypt')


const router = Router()

router.post('/', async (req, res) => {
    const { option } = req.query
    const { delivery_status, orderId, restId, shopSetting } = req.body
    console.log(restId)
    console.log(shopSetting)
    switch (option) {
        case 'status':
            await Order.findByIdAndUpdate(
                {
                    _id: orderId
                },
                {
                    delivery_status: delivery_status === 'errorProceso' ? 'proceso' : delivery_status
                },
                {
                    new: true
                })
            const orders = await Order.find({ delivery_status: delivery_status === 'errorProceso' ? 'proceso' : delivery_status })
            return res.status(200).send({
                status: true,
                orders: orders
            })

        case 'shopsettings':
            await Restaurant.findByIdAndUpdate(
                {
                    _id: restId
                },
                shopSetting
                ,
                {
                    new: true
                }
            )
            return res.status(200).send({
                status: true,
                msg: 'Se actualizo correctamente'
            })

        default:
            throw Error('Falta opcion de administracion de negocio')
    }
})

router.post('/password', async (req, res) => {
    const { restId, newPassword, actualPassword } = req.body

    try {

        const shop = await Restaurant.findOne({ _id: restId })

        if (!shop) throw Error(`El id: ${restId} no corresponde a ningun negocio`)

        const decryptPass = await bcrypt.compare(actualPassword, shop.password)

        console.log(shop.password, actualPassword, decryptPass)

        const correctPassword = decryptPass ? true : false

        if (!correctPassword) throw Error('Las contraseñas no coinciden')

        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(newPassword, salt)

        await Restaurant.findByIdAndUpdate(
            {
                _id: restId
            },
            {
                password: hash
            },
            {
                new: true
            }
        )

        return res.status(200).send({
            status: true,
            msg: 'La contraseña ha sido cambiada'
        })

    } catch (error) {
        return res.status(400).send({
            status: false,
            msg: error.message
        })
    }
})

router.get('/orders', async (req, res) => {

    const { delivery_status, restId } = req.query

    try {

        console.log(delivery_status)

        const orders = await Order.find({
            restaurant_id_mongo: restId,
            delivery_status: delivery_status
        })
        console.log(orders)

        return res.status(200).send({
            status: true,
            msg: `Ordenes enviadas al restaurante: ${restId}`,
            orders
        })
    } catch (error) {
        console.log(error)
        return res.status(400).send({
            status: false,
            msg: error.msg
        })
    }

})

router.post('/food', async (req, res) => {
    const { foodId, restId, attributes } = req.body
    try {
        await Food.findByIdAndUpdate(
            {
                _id: foodId
            },
            attributes
        )

        return res.status(200).send({
            status: true,
            msg: `Se actualizo el producto con id: ${foodId}`
        })
    } catch (error) {
        return res.status(400).send({
            status: false,
            msg: error.message
        })
    }
})

router.get('/:restId', async (req, res) => {
    const { restId } = req.params

    try {

        const shop = await Restaurant.findOne({ _id: restId })

        const { name, country, state, city, coordinates, address, phone, email, delivery, online_payment } = shop

        const shop_info = {
            name,
            country,
            state,
            city,
            coordinates,
            address,
            phone,
            email,
            delivery,
            online_payment
        }

        return res.status(200).send({
            status: true,
            shop_info,
            msg: `Informacion de negocio con id: ${restId} enviada exitosamente`
        })
    } catch (error) {
        return res.status(400).send({
            status: false,
            msg: error.message
        })
    }

})

module.exports = router