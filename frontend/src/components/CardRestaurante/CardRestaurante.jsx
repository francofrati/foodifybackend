import React from 'react'

import s from './CardRestaurante.module.css'

const CardRestaurante = ({img,name,country}) => {
  return (
    <div className={s.container}>
        <div style={{'backgroundColor':'grey'}}>
            <img src={img} alt={name} style={{'width':'130px','height':'100%'}}/>
        </div>
        <div style={{'display':'flex','justifyContent':'space-evenly','flexDirection':'column'}}>
                <p className={s.name}>{name}</p>                      
                <p style={{'margin':'0'}}>Acepta pagos online ✨</p>
                <p style={{'margin':'0'}}>🚩{country}🚩</p>            
        </div>
    </div>
  )
}

export default CardRestaurante