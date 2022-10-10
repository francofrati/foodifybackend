import React from 'react'

import s from './Orders.module.css'

const Orders = () => {
  return (
    <div className={s.cont}>
        <div className={s.state_column}>
            <div className={s.state}>Pendientes</div>
            <div className={s.orders_cont}></div>
        </div>
        <div className={s.state_column}>
            <div className={s.state}>En proceso</div>
            <div className={s.orders_cont}></div>
        </div>
        <div className={s.state_column}>
            <div className={s.state}>Finalizados</div>
            <div className={s.orders_cont}></div>
        </div>
    </div>
  )
}

export default Orders