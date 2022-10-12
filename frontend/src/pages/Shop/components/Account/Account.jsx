import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import MapComponent from '../../../../components/Map/MapComponent'

import s from './Account.module.css'


const NegocioSettings = () => {

    const [coordinates,setCoordinates] = useState(null)

    const coordinatesToProps = (value)=>{
        setCoordinates(value)
    }

    useEffect(()=>{
        console.log(coordinates)
    },[coordinates])

    return (
        <div>
            <div>
                <div>Cambiar nombre de negocio:<input /></div>
            </div>
            <div>
                <div>Cambiar Ubicacion:</div>
                <div>Pais:<input /></div>
                <div>Estado o Provincia:<input /></div>
                <div>Ciudad:<input /></div>
                <div>Direccion:<input /></div>
                <div>
                    <div>
                        Marca tu ubicacion en el mapa para que los clientes te encuentran mas facil
                    </div>
                    <MapComponent setCoordinates={coordinatesToProps}/>
                </div>
            </div>
        </div>
    )
}
const AccountSettings = () => {
    return (
        <>Cuenta</>
    )
}
const ServicioSettings = () => {
    return (
        <>Servicio</>
    )
}


const Account = () => {

    const [option, setOption] = useState('')

    const handleOptions = (state) => {
        switch (state) {
            case 'negocio':
                return <NegocioSettings />
            case 'cuenta':
                return <AccountSettings />
            case 'servicio':
                return <ServicioSettings />
            default:
                return <></>
        }
    }

    return (
        <div className={s.cont}>
            <div className={s.option_cont}>
                <div className={s.label} onClick={() => setOption('negocio')}>
                    Informacion del negocio
                </div>

                <div className={s.label} onClick={() => setOption('cuenta')}>
                    Informacion de la cuenta
                </div>

                <div className={s.label} onClick={() => setOption('servicio')}>
                    Servicios
                </div>
            </div>
            <div>
                {handleOptions(option)}
            </div>

        </div>
    )
}

export default Account