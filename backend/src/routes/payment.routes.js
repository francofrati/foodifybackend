const { Router } = require("express")
const { 
    handleWebHook
} = require("../controllers/payment.controller")

const router = Router()

router.get("/webhook", handleWebHook)

module.exports = router