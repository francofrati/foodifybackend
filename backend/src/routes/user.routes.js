const { Router } = require("express")
const { getUsers, getUserById, putUser, putUserFood, deleteUser } = require("../controllers/user.controller.js")

const router = Router()

router.get('/', getUsers)

router.get('/:idUser', getUserById)

router.put('/:idUser', putUser)

router.put('/:idUser/:idFood', putUserFood)

router.delete('/:idUser', deleteUser)



module.exports = router