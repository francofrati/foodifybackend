import { useState } from 'react'
import { useDispatch } from 'react-redux'
import s from './Card.module.css'

const Card = ( { id, title, image, price, rating } ) => {
    const dispatch = useDispatch()

    const ratingfix = rating.toFixed(1)

    return(
        <div className={s.container}>
            <div className={s.image}>
                <img src={image} width="400px" height="305px"/>
            </div>
            <div className={s.content}>
                <div>{title}</div>
                <br />
                <div>{price}</div>
                <br />
                <div>{ratingfix}</div>
            </div>
        </div>
    )
}

export default Card