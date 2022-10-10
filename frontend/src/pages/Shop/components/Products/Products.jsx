import React from 'react'

import s from './Products.module.css'

import CreateFood from '../../../../components/RestaurantComponents/CreateFood/CreateFood'

const Products = () => {
  return (
    <div className={s.cont}>
        <div className={s.form}>
            <h3>Ingresar nuevo producto</h3>
            <CreateFood />
        </div>
        <div className={s.products_cont}>
        </div>
    </div>
  )
}

export default Products