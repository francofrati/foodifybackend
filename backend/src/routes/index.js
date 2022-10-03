const express = require("express")
const FoodRouter = require("./food.routes.js")
const UserRouter = require('./user.routes')

const RestaurantRouter = require("./restaurant.routes")


const router = express.Router()

router.use("/foods", FoodRouter);

router.use("/user",UserRouter);

router.use("/restaurant",RestaurantRouter)


module.exports = router