const { Router } = require('express')

const Order = require('../models/Order')


const router = Router()

router.post('/', async (req, res) => {
    const { option } = req.query
    const { delivery_status, orderId } = req.body
    console.log(orderId)
    console.log(delivery_status)
    switch (option) {
        case 'status':            
            await Order.findByIdAndUpdate(
                {
                    _id: orderId
                },
                {
                    delivery_status: delivery_status==='errorProceso'?'proceso':delivery_status
                },
                {
                    new: true
                })
            const orders = await Order.find({delivery_status:delivery_status==='errorProceso'?'proceso':delivery_status})
            return res.status(200).send({
                status:true,
                orders:orders
            })

            default:
                throw Error('Falta opcion de administracion de negocio')
    }
})

module.exports = router