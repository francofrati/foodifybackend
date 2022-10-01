import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllRestaurants } from '../../Redux/thunks/restaurantsThunks'

import CardRestaurante from '../CardRestaurante/CardRestaurante'
import s from './Restaurants.module.css'
const Restaurants = () => {

    const { renderedRestaurants } = useSelector((state) => state.restaurants)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAllRestaurants())
    }, [dispatch])

    return (
        <div className={s.cont}>
            {renderedRestaurants.length
                ? renderedRestaurants.map((r) => {
                    return <CardRestaurante
                        name={r.name}
                        image={r.image}
                        key={r.email}
                        plus={r.plus}
                        delivery={r.delivery}
                        online={r.online_payment}
                    />
                })
                : <>Cargando..</>
            }
        </div>
    )
}

export default Restaurants