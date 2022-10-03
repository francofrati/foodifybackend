import axios from 'axios'
import { getFoods, getDiets, searchFood } from '../slices/foodSlice'

const fetchAllFoods = () => (dispatch) => {
    axios.get("/foods")
    .then((response) => {
        dispatch(getFoods(response.data.foods))
    })
    .catch((error) => console.log(error))
}

const fetchAllDiets = () => (dispatch) => {
    axios.get("/foods/diets")
    .then((response) => {
        dispatch(getDiets(response.data.diets))
    })
    .catch((error) => console.log(error))
}

const fetchFoodsByTitle = (title) => (dispatch) => {
    axios.get(`/foods?title=${title}`)
    .then((response) => {
        dispatch(searchFood(response.data.foods))
    })
    .catch((error) => console.log(error))
} 

export {
    fetchAllFoods,
    fetchAllDiets,
    fetchFoodsByTitle
}