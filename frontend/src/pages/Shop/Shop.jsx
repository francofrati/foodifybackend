import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { fetchCreds } from '../../Redux/thunks/userThunks'

const Shop = () => {

    const navigate = useNavigate()

    const { user } = useSelector(state => state.user)
    
    const dispatch = useDispatch()

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if(token){
            dispatch(fetchCreds(token))
        }
        // if (user===null || user.type !== 'restaurant') navigate('/restaurantes')
    }, [])

    
        return (
            <div>
                <h1>Tienda</h1>
                <h3>{user&&user.name}</h3>
            </div>
        )
    
}

export default Shop