const { Router } = require('express')

const { signUp, login, getAuth } = require('../controllers/user.controller')

const router = Router()


router.post("/signup", signUp)

router.post("/login", login)

router.post("/auth", getAuth)



module.exports = router