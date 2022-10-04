const { Router } = require('express')

const {
    createRestaurant,
    getAllRestaurants,
    getOneRestaurant, getAuth,
    loginRestaurant
} = require('../controllers/restaurant.controller')


const router = Router()

router.get("/", getAllRestaurants)

router.get("/:id", getOneRestaurant)

router.post("/register", createRestaurant)

router.post("/login", loginRestaurant)

router.post("/auth", getAuth)


module.exports = router