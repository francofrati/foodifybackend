const express = require("express")

const UserRouter = require('./user.routes')
const RestaurantRouter = require("./restaurant.routes")
const FoodRouter = require("./food.routes.js")
const PaymentRouter = require("./payment.routes.js")
const OrderRouter = require("./order.routes.js")

const {getAuth} = require('../controllers/auth.controllers.js')

<<<<<<< HEAD

=======
>>>>>>> ee0cfd0c88dc33df0f211721cd7d49be4114d782

const router = express.Router()

router.use("/user",UserRouter);

router.use("/restaurant",RestaurantRouter)

router.use("/foods", FoodRouter);

router.use("/payment", PaymentRouter)

router.use("/orders", OrderRouter);

router.post("/authentication", getAuth)


module.exports = router