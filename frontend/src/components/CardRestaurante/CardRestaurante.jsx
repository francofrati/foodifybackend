import React from 'react'
import {MdDeliveryDining} from 'react-icons/md'
import {FaCreditCard} from 'react-icons/fa'
import {AiOutlineClockCircle} from 'react-icons/ai'

import s from './CardRestaurante.module.css'
import foodifypluslogo from '../../assets/foodify-plus.png'
import borrar from '../../assets/borrar.png'

const CardRestaurante = ({name,image,plus,online,delivery,onclick}) => {

  return (
    <div className={s.cont} onClick={onclick}>
      <div>
        <div className={s.logo_cont}>
          <img className={s.logo} src={image} alt={name} />
        </div>
      </div>
      <div className={s.description_cont}>
        <div className={s.title_cont}>
          <span className={s.title}>{name}</span>
          {plus?<img className={s.plus_logo} src={foodifypluslogo} alt={'plus'} />:<></>}
        </div>
        <div className={s.options_foodimg_cont}>
          <div className={s.options_cont}>
            {online?<span className={s.options}><FaCreditCard style={{'color':'#20B5E5','fontSize':'1.5rem'}}/>Pagos Online</span>:<></>}
            {delivery?<span className={s.options}><MdDeliveryDining style={{'color':'#20B5E5','fontSize':'1.5rem'}}/>Delivery</span>:<></>}
            <span className={s.options}><AiOutlineClockCircle style={{'color':'#20B5E5','fontSize':'1.5rem'}}/>Demora: 25-30min</span>
          </div>
          <div className={s.rest_foods_img_cont}>
            <div>
              <img className={s.rest_foods_img} src={borrar} alt={"borrar"} />
            </div>
            <div>
              <img className={s.rest_foods_img} src={borrar} alt={"borrar"} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CardRestaurante