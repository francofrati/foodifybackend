import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRestaurants } from '../../Redux/thunks/restaurantsThunks'

import CardRestaurante from '../CardRestaurante/CardRestaurante'
import s from './Restaurants.module.css'
const Restaurants = () => {

    const { restaurants } = useSelector((state) => state.restaurants)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllRestaurants())
    }, [dispatch])

    return (
        <div className={s.cont}>
            {restaurants.length
                ? restaurants.map((r) => {
                    return <CardRestaurante
                        name={r.name}
                        image={r.image}
                        key={r.email}
                    />
                })
                : <>Cargando..</>
            }
        </div>
    )
}

export default Restaurants