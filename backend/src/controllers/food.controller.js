const Food = require("../models/Food.js")
const axios = require("axios")
require("dotenv").config();
const {
    paginate,
    sortNames,
    sortPrices,
    getByDiet,
    getByTitle
} = require("../lib/food.controller.helper.js")

const dataApi = async (req, res) => {
    try {
        const info = await axios.get("https://api.spoonacular.com/recipes/complexSearch?apiKey=3c0bc46ea185416c9f31e066115651fb&addRecipeInformation=true&number=150")

        const infoTotal = info.data.results

        infoTotal.forEach((el) => {
            Food.create({
                idApi: el.id,
                title: el.title,
                image: el.image,
                diets: el.diets.map((current) => current),
                price: el.pricePerServing,
                rating: (el.healthScore * 0.1)
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

        const foods = await Food.find({ deleted: false });

        if (sort) foods = sortNames({ foods, sort });

        if (price) foods = sortPrices({ foods, sort });

        if (title) foods = getByTitle({ foods, title });

        if (diet) foods = getByDiet({ foods, diet });

        console.log(foods)
        
        return res.status(200).json({ foods })
    } catch (error) {
        return res.status(500).json({ error: error })
    }
}

module.exports = {
    dataApi,
    getFoods
}