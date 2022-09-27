import axios from 'axios'
import { getFoods } from '../slices/foodSlice'

const fetchAllFoods = () => (dispatch) => {
    axios.get("/foods")
    .then((response) => {
        dispatch(getFoods(response.data.foods))
    })
    .catch((error) => console.log(error))
}

export {
    fetchAllFoods
}