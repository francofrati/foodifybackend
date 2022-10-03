const { Router } = require("express")
const { dataApi, getFoods, getFoodById, postFood, putFood, deleteFood, getDiets } = require("../controllers/food.controller.js")

const router = Router();

//PARA LLENAR LA BASE DE DATOS
// router.get('/data', dataApi)


router.get('/', getFoods)

router.get('/diets', getDiets)

router.post('/', postFood)


//Get de una comida con id de la comida
router.get('/:idFood', getFoodById)


//Post (CREAR HACER RELACION)
router.post('/:idRestaurant', postFood)


//Update de una comida
router.put('/:idFood', putFood)


//Eliminar una comida
router.delete('/:idFood', deleteFood)


module.exports = router;
