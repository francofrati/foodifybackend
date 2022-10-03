import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaSlidersH } from 'react-icons/fa'

import { filterRestaurants, setSortMarker } from '../../../Redux/slices/restaurantsSlice'
import s from './FIlter.module.css'
import { useEffect } from 'react'


export const filterTypesNames = {
    sort_names: [
        {
            name: 'Mejor puntuacion',
            type: 'RATING'
        },
        {
            name: 'Menor costo de entrega',
            type: 'DELIVERY_COST'
        },
        {
            name: 'Tiempo de demora',
            type: 'DELIVERY_TIME'
        }
    ],
    filter_names: [
        {
            name: 'Foodify +',
            type: 'PLUS'
        },
        {
            name: 'Delivery',
            type: 'DELIVERY'
        },
        {
            name: 'Pago Online',
            type: 'ONLINEPAYMENT'
        }


    ]
}

const CustomRadioInput = ({ name, value, type }) => {

    const dispatch = useDispatch()

    const { sortMarker } = useSelector(state => state.restaurants)

    const clickInput = () => {
        dispatch(setSortMarker(value))
        dispatch(filterRestaurants(value))
    }

    if (sortMarker.includes(value)) {
        return <></>
    } else {
        return (
            <div className={s.input_cont} onClick={clickInput} >
                <label className={s.label}>{name}</label>
            </div>
        )
    }

}



const Filter = () => {
    const { sortMarker } = useSelector(state => state.restaurants)
    const dispatch = useDispatch()
    useEffect(() => {
        console.log(sortMarker)
    }, [sortMarker])

    return (
        <div className={s.cont}>
            <div className={s.icon_cont}>
                <FaSlidersH className={s.icon} style={{ 'color': '#20B5E5' }} />
            </div>
            <div className={s.filters_cont}>
                <div className={s.filt_cont}>
                    <span className={s.filt_title}>Ordenar por:</span>
                    <div className={s.inputs_cont}>
                        {filterTypesNames.sort_names.map((n) => <CustomRadioInput name={n.name} key={n.name} value={n.type} type={'sort'} />)}
                    </div>
                </div>
                <div className={s.filt_cont}>
                    <span className={s.filt_title}>Filtrar por:</span>
                    <div className={s.inputs_cont}>
                        {filterTypesNames.filter_names.map((n) => <CustomRadioInput name={n.name} key={n.name} value={n.type} type={'filter'} />)}
                    </div>
                </div>
            </div>

            {sortMarker.map(e => <span>{e}</span>)}
            {sortMarker.length
                ? <button onClick={() => {
                    dispatch(setSortMarker('CLEAR'))
                    dispatch(filterRestaurants('CLEAR'))
                }}>Restablecer</button>
                : <></>}
        </div>
    )
}

export default Filter