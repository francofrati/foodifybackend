import axios from 'axios'

import { credsURL } from '../../assets/endpoints'
import { getUserCreds } from '../slices/userSlice'

const fetchCreds = (token) => (dispatch) => {
    const body = {
        token
    }
    axios.post(credsURL, body)
        .then((response) => {
            if(response.data.error){
                dispatch(getUserCreds(null))
                return
            }
            dispatch(getUserCreds(response.data))
            console.log('biennnnn',response.data)
        })
        .catch((error) => {
            console.log(error)
            console.log('errrror',error)
        })
}

export {
    fetchCreds
}