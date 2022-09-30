import React from 'react'
import { useState } from 'react'
import { FaSlidersH } from 'react-icons/fa'

import s from './FIlter.module.css'

const filterTypesNames = {
    sort_names: [
        'Mejor puntuacion',
        'Mayor costo de entrega',
        'Menor costo de entrega'
    ],
    filter_names: [
        'Foodify +',
        'Delivery'
    ]
}

const CustomRadioInput = ({ name }) => {
    const [activeInput, setActiveInput] = useState(false)
    const clickInput = () => {
        //falta agregarle la funcionalidad de poder manipular el filtrado
        setActiveInput((prevState) => !prevState)
    }
    return (
        <div className={s.input_cont} onClick={clickInput} id={name}>
            <div className={activeInput?s.input+' '+s.active_input:s.input} ></div> <label className={s.label}>{name}</label>
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
                        {filterTypesNames.sort_names.map((n) => <CustomRadioInput name={n} key={n}/>)}
                    </div>
                </div>
                <div className={s.filt_cont}>
                    <span className={s.filt_title}>Filtrar por:</span>
                    <div className={s.inputs_cont}>
                        {filterTypesNames.filter_names.map((n) => <CustomRadioInput name={n} key={n}/>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Filter