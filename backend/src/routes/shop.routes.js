const { Router } = require('express')

const Order = require('../models/Order')
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

        if(!shop)throw Error(`El id: ${restId} no corresponde a ningun negocio`)

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

module.exports = router