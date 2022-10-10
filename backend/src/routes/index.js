const express = require("express")

const UserRouter = require('./user.routes')
const RestaurantRouter = require("./restaurant.routes")
const FoodRouter = require("./food.routes.js")

const {getAuth} = require('../controllers/auth.controllers.js')


const router = express.Router()

router.use("/user",UserRouter);

router.use("/restaurant",RestaurantRouter)

router.use("/foods", FoodRouter);

router.post("/authentication", getAuth)


module.exports = router