import axios from 'axios'

import { credsURL } from '../../assets/endpoints'
import { getUserCreds } from '../slices/userSlice'

const fetchCreds = (token) => (dispatch) => {
    const body = {
        token
    }
    axios.post(credsURL, body)
        .then((response) => {
            dispatch(getUserCreds(response.data))
            console.log(response.data)
        })
        .catch((error) => console.log(error))
}

export {
    fetchCreds
}