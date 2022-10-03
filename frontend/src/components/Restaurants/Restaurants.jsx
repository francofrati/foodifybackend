import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchAllRestaurants } from '../../Redux/thunks/restaurantsThunks'

import CardRestaurante from '../CardRestaurante/CardRestaurante'
import s from './Restaurants.module.css'


const Restaurants = () => {

    const navigate = useNavigate()

    const { renderedRestaurants } = useSelector((state) => state.restaurants)

    const [level, setLevel] = useState(20)

    const dispatch = useDispatch()

    const handleRestaurantRedirect = (id)=>{
        navigate(`/restaurantes/${id}`)
    }

    useEffect(() => {
        dispatch(fetchAllRestaurants())
    }, [dispatch])

    return (
        <div className={s.cont}>
            {renderedRestaurants.length
                ? renderedRestaurants.slice(0,level).map((r) => {
                    return <CardRestaurante
                        name={r.name}
                        image={r.image}
                        key={r.id}
                        plus={r.plus}
                        delivery={r.delivery}
                        online={r.online_payment}
                        onclick={()=>handleRestaurantRedirect(r.id)}
                    />
                })
                : <>Cargando..</>
            }
            {renderedRestaurants.length>level
                ? <button className={s.btn_more} onClick={()=>setLevel((prevState)=>prevState+20)}>Mostrar mas</button>
                : <></>
            }
        </div>
    )
}

export default Restaurants