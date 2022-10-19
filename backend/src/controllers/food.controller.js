require("dotenv").config();

const axios = require("axios")

const Food = require("../models/Food.js")
const User = require("../models/User.js")
const Restaurant = require("../models/Restaurant.js")

const {
    paginate,
    sortNames,
    sortPrices,
    getByDiet,
    getByTitle
} = require("../lib/food.controller.helper.js")


const dataApi = async (req, res) => {
    try {
        // const info = await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=3c0bc46ea185416c9f31e066115651fb&addRecipeInformation=true&number=150")
        const info = await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=3c0bc46ea185416c9f31e066115651fb&addRecipeInformation=true&number=25&offset=75")

        const infoTotal = info.data.results

        infoTotal.forEach((el) => {
            Food.create({
                idApi: el.id,
                title: el.title,
                image: el.image,
                diets: el.diets.map((current) => current),
                price: el.pricePerServing,
                rating: (el.healthScore * 0.1),
                seller: '633b1e34953ac3c0810b4438'
            })
        })

        res.status(200).json({ msg: "Foods added succesfully" })
    } catch (error) {
        return res.status(400).json({ error: error });
    }
}

const getFoods = async (req, res) => {

    const { title } = req.query

    const { diet } = req.query

    const { sort } = req.query

    const { limit, page } = req.query;

    const { price } = req.query;

    try {

        let foods = await Food.find({ deleted: false });

        if (sort) foods = sortNames({ foods, sort });

        if (price) foods = sortPrices({ foods, sort });

        if (title) foods = getByTitle({ foods, title });

        if (diet) foods = getByDiet({ foods, diet });



        return res.status(200).json({ foods })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}


const getFoodById = async (req, res) => {
    const { idFood } = req.params

    try {
        const food = await Food.findById(idFood)  //Posiblemente falten cambios a esta ruta
        return res.status(200).json({ food: food })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}


const postFood = async (req, res) => {
    const { food, idRestaurant } = req.body
    // const { idRestaurant } = req.params
    console.log(food, idRestaurant)
    if (!idRestaurant) {
        try {
            await Food.create(food)

            return res.status(200).json({ foodAdded: 'Food added successfully' })
        } catch (error) {
            return res.status(200).json({ error: error })
        }
    }
    else {
        try {
            const restaurant = await Restaurant.findOne({ _id: idRestaurant })

            if (!restaurant) throw Error(`El id: ${idRestaurant} no corresponde a ningun Negocio`)

            console.log(restaurant._id)

            const foodAdded = await Food.create(food)

            await Food.findByIdAndUpdate(
                foodAdded._id,
                { seller: restaurant._id },
                { new: true, useFindAndModify: false }
            )

            await Restaurant.findByIdAndUpdate(
                idRestaurant,
                { $push: { selling_foods: foodAdded._id } },
                { new: true, useFindAndModify: false }
            )

            return res.status(201).json({ 
                status:true,
                msg:`El producto ${foodAdded.title} se agrego al negocio ${restaurant.name}`
            })
        } catch (error) {
            return res.status(500).json({ 
                status:false,
                msg:error.message
             })
        }
    }
}



const putFood = async (req, res) => {
    const { idFood } = req.params
    const food = req.body

    try {
        const foodUpdated = await Food.updateOne({ _id: idFood }, { $set: book })

        return res.status(201).json({ foodUpdated: foodUpdated })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}


const deleteFood = async (req, res) => {
    const { idFood } = req.params
    const { idRestaurant } = req.params
    if (!idRestaurant) {
        try {
            const foodDeleted = await Food.findByIdAndUpdate(idFood, {
                deleted: true
            })
            return res.status(200).json({ foodDeleted: foodDeleted })
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }
    else {
        try {
            const foodDeleteRelation = await Food.findByIdAndUpdate(idFood, {
                $pull: {
                    seller: idRestaurant
                }
            })

            const restaurantDeleteRelation = await User.findByIdAndUpdate(idRestaurant, {
                $pull: {
                    selling_foods: idFood
                }
            })

            return res.status(201).json({ foodDeleted: 'Relationship deleted' })
        } catch (error) {
            return res.status(500).json({ error: error })
        }
    }
}


const getDiets = async (req, res) => {
    const diets = [
        'gluten free',
        'ketogenic',
        'vegetarian',
        'lacto ovo vegetarian',
        'paleolithic',
        'primal',
        'whole 30',
        'vegan',
        'dairy free',
        'fodmap friendly',
        'pescatarian'
    ]
    try {
        return res.status(200).json({ diets })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

module.exports = {
    dataApi,
    getFoods,
    getFoodById,
    postFood,
    putFood,
    deleteFood,
    getDiets
}