import axios from 'axios'

import { getAllRestaurants, getOneRestaurant, getRestCreds } from '../slices/restaurantsSlice'
import { allRestaurantsURL, credsRestURL, oneRestaurantURL } from '../../assets/endpoints'

const fetchAllRestaurants = () => (dispatch) => {
    axios.get(allRestaurantsURL)
        .then((response) => {
            dispatch(getAllRestaurants(response.data))
        })
        .catch((error) => console.log(error))
}

const fetchOneRestaurant = (id) => (dispatch) => {
    axios.get(oneRestaurantURL(id))
        .then((response) => {
            dispatch(getOneRestaurant(response.data))
        })
        .catch((error) => console.log(error))
}

const fetchCredsRest = (token) => (dispatch) => {
    const body = {
        token
    }
    axios.post(credsRestURL, body)
        .then((response) => {
            if(response.data.error){
                dispatch(getRestCreds(null))
                return
            }
            dispatch(getRestCreds(response.data))
            console.log('biennnnn',response.data)
        })
        .catch((error) => {
            console.log(error)
            console.log('errrror',error)
        })
}

export {
    fetchAllRestaurants,
    fetchOneRestaurant,
    fetchCredsRest
}