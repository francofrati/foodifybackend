import React, { useEffect, useState } from 'react'

import { FiEdit2 } from 'react-icons/fi'

import s from './Products.module.css'

import CreateFood from '../../../../components/RestaurantComponents/CreateFood/CreateFood'
import axios from 'axios'
import { getAllFoodURL } from '../../../../assets/endpoints'



const CustomInput = ({ data, field }) => {

  const [editField, setEditField] = useState(false)

  const handleView = ()=>{
    setEditField(prevState => (!prevState))
  }

  return (
    <div>{field}:
      {editField
        ? <>
          <input placeholder={data} />
          <button onClick={handleView}>Cancelar</button>
          <button>Editar</button>
        </>
        : <>
          <span>{data}</span>
          <button onClick={handleView}>Editar</button>
        </>
      }
    </div>
  )
}

const ProductCard = ({ productName, productDescription, productPrice, timesSold, productImage }) => {

  const [edit, setEdit] = useState(false)

  return (
    <>
      <div className={s.row_cont} >
        <div className={s.row_name}>{productName}</div>
        <div className={s.row_desc}>{productDescription && productDescription.substr(0, 40)}</div>
        <div className={s.row_price}>{productPrice}</div>
        {/* <div className={s.row_times}>{timesSold}</div> */}
        <div className={s.row_img}>
          <img src={productImage} alt={productName} style={{ width: 40, height: 40 }} />
        </div>
        <div onClick={() => setEdit(prevState => !prevState)}>
          <FiEdit2 />
        </div>
      </div>
      {edit && <div>
        <CustomInput data={productName} field='Nombre' />
        <CustomInput data={productPrice} field='Precio' />
        <CustomInput data={productDescription} field='Descripcion' />
        <CustomInput data={productImage} field='Imagen' />

      </div>}
    </>
  )
}

const ProductsCont = () => {

  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get(getAllFoodURL)
      .then(r => {
        setProducts(r.data.foods)
      })
      .catch(e => console.log(e))
  }, [])

  return (
    <>
      {products.length && products.map((p, i) => (
        <ProductCard
          key={i}
          productName={p.title}
          productDescription={p.despription}
          productPrice={p.price}
          productImage={p.image}
        />
      ))}
    </>
  )
}



const Products = ({ restId }) => {
  return (
    <div className={s.cont}>
      <div className={s.form}>
        <CreateFood restId={restId} />
      </div>
      <div className={s.products_cont}>
        <ProductsCont />
      </div>
    </div>
  )
}

export default Products