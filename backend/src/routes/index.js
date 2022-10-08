const express = require("express")

const UserRouter = require('./user.routes')
const RestaurantRouter = require("./restaurant.routes")
const FoodRouter = require("./food.routes.js")
const PaymentRouter = require("./payment.routes.js")


const router = express.Router()


router.use("/user",UserRouter);

router.use("/restaurant",RestaurantRouter)

router.use("/foods", FoodRouter);

router.use("/payment", PaymentRouter)


module.exports = router