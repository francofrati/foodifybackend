import React from 'react'
import {useNavigate} from 'react-router-dom'

import s from './CardRestaurante.module.css'

const CardRestaurante = ({img,name,country,id}) => {

  const navigate = useNavigate()

  const redirectToRestaurantPage = (id)=>{
    navigate(`/restaurantes/${id}`)
  }

  return (
    <div className={s.container}>
        <div 
        style={{'backgroundColor':'grey','cursor':'pointer'}} 
        onClick={()=>redirectToRestaurantPage(id)}>
            <img src={img} alt={name} style={{'width':'130px','height':'100%'}}/>
        </div>
        <div style={{'display':'flex','justifyContent':'space-evenly','flexDirection':'column','marginLeft':'10px','alignItems':'flex-start'}}>
                <p 
                className={s.name} 
                onClick={()=>redirectToRestaurantPage(id)}
                >{name}</p>                      
                <p style={{'margin':'0'}}>Acepta pagos online ✨</p>
                <p style={{'margin':'0'}}>🚩{country}🚩</p>            
        </div>
    </div>
  )
}

export default CardRestaurante