import axios from 'axios'

import { credsURL } from '../../assets/endpoints'
import { getUserCreds, getUsers, getUserById } from '../slices/userSlice'

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


const fetchAllUsers = () => (dispatch) => {
    axios
      .get("/users")
      .then((response) => {
        dispatch(getUsers(response.data.users));
      })
      .catch((error) => console.log(error));
  };
  
  const fetchUserById = (id) => (dispatch) => {
    //console.log(id)
    axios
      .get(`/users/${id}`)
      .then((response) => {
        //console.log(response.data)
        dispatch(getUserById(response.data.userrrs));
      })
      .catch((error) => console.log(error));
  };
  
  const fetchDeleteUser = (id) => (dispatch) => {
    axios
      .delete(`/users/${id}`)
      .then(dispatch(fetchAllUsers()))
      .catch((error) => console.log(error));
  };

export {
    fetchCreds,
    fetchAllUsers,
    fetchUserById,
    fetchDeleteUser
}