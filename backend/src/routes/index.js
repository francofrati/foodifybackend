const express = require("express")
const FoodRouter = require("./food.routes.js")

const router = express.Router()


router.use("/foods", FoodRouter);


module.exports = router