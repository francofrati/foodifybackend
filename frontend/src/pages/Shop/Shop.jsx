import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Shop = () => {

    const navigate = useNavigate()

    const { user } = useSelector(state => state.user)

    useEffect(() => {

        if (!user || user.type !== 'restaurant') navigate('/restaurantes')

    }, [user, navigate])

    
        return (
            <div>Shop</div>
        )
    
}

export default Shop