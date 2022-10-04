const { Router } = require('express')

const {
    signUp,
    login,
    getAuth,
    getUsers,
    getUserById,
    putUser,
    putUserFood,
    deleteUser
} = require('../controllers/user.controller')


const router = Router()

router.get('/', getUsers)

router.post("/signup", signUp)

router.post("/login", login)

router.post("/auth", getAuth)

router.get('/:idUser', getUserById)

router.put('/:idUser', putUser)

router.put('/:idUser/:idFood', putUserFood)

router.delete('/:idUser', deleteUser)


module.exports = router



