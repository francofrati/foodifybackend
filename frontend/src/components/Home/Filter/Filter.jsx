import React from 'react'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { FaSlidersH } from 'react-icons/fa'

import {filterRestaurants} from '../../../Redux/slices/restaurantsSlice'
import s from './FIlter.module.css'

const filterTypesNames = {
    sort_names: [
        {
            name: 'Mejor puntuacion',
            type: 'RATING'
        },
        {
            name: 'Menor costo de entrega',
            type: 'DELIVERY_COST'
        }
    ],
    filter_names: [
        {
            name:'Foodify +',
            type:'PLUS'
        },
        {
            name:'Delivery',
            type:'DELIVERY'
        },
        {
            name:'Pago Online',
            type:'ONLINEPAYMENT'
        }

        
    ]
}

const CustomRadioInput = ({ name,value }) => {
    const [activeInput, setActiveInput] = useState(false)
    const dispatch = useDispatch()
    const clickInput = () => {
        dispatch(filterRestaurants(value))
        setActiveInput((prevState) => !prevState)
    }
    return (
        <div className={s.input_cont} onClick={clickInput} >
            <div className={activeInput ? s.input + ' ' + s.active_input : s.input} ></div> <label className={s.label}>{name}</label>
        </div>
    )
}



const Filter = () => {



    return (
        <div className={s.cont}>
            <div className={s.icon_cont}>
                <FaSlidersH className={s.icon} style={{ 'color': '#20B5E5' }} />
            </div>
            <div className={s.filters_cont}>
                <div className={s.filt_cont}>
                    <span className={s.filt_title}>Ordenar por:</span>
                    <div className={s.inputs_cont}>
                        {filterTypesNames.sort_names.map((n) => <CustomRadioInput name={n.name} key={n.name} value={n.type}/>)}
                    </div>
                </div>
                <div className={s.filt_cont}>
                    <span className={s.filt_title}>Filtrar por:</span>
                    <div className={s.inputs_cont}>
                        {filterTypesNames.filter_names.map((n) => <CustomRadioInput name={n.name} key={n.name} value={n.type} />)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter