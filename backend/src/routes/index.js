const express = require("express")

const FoodRouter = require("./food.routes.js")
const UserRouter = require("./user.routes")

const router = express.Router()


router.use("/foods", FoodRouter);

router.use("/user",UserRouter)


module.exports = router