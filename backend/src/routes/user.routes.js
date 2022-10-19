const { Router } = require('express')

const {
    signUp,
    login,
    getAuth,
    getUsers,
    getUserById,
    putUser,
    putUserFood,
    deleteUser,
    googleAuth,
    getVerification,
    isUserVerificated,
    addFavoriteRestaurant,
    getFavoriteRestaurants
} = require('../controllers/user.controller')


const router = Router()

router.get('/', getUsers)

router.post("/signup", signUp)

router.post("/google",googleAuth)

router.post("/login", login)

router.post("/verify", getVerification)

router.get("/verify/:userId",isUserVerificated)

router.get('/:idUser', getUserById)

router.put('/:idUser', putUser)

router.put('/:idUser/:idFood', putUserFood)

router.delete('/:idUser', deleteUser)

router.post('/favorite', addFavoriteRestaurant)

router.get('/favorite/:userId',getFavoriteRestaurants)

module.exports = router



