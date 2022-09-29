const { Router } = require('express')

const { createRestaurant, getAllRestaurants, getOneRestaurant } = require('../controllers/restaurant.controller')


const router = Router()

router.get("/", getAllRestaurants)

router.get("/:id", getOneRestaurant)

router.post("/register", createRestaurant)


module.exports = router