const { Router } = require('express')

const { signUp, login, getCreds } = require('../controllers/user.controller')

const router = Router()


router.post("/signup", signUp)

router.post("/login", login)

router.post("/creds", getCreds)

module.exports = router