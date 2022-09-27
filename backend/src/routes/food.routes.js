const { Router } = require("express")
const { dataApi, getFoods } = require("../controllers/food.controller.js")

const router = Router();

//PARA LLENAR LA BASE DE DATOS
// router.get('/data', dataApi)


router.get('/', getFoods)


module.exports = router;
