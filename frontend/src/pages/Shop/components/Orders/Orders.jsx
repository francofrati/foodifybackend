import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getOrdersByRestId } from '../../../../assets/endpoints'

import s from './Orders.module.css'



const Order = ({ name, img, status, user_name, address, handleStatus, id }) => {

  console.log(id)
  return (
    <div>
      {/* <div className={s.img_cont}>
        <img className={s.img} src={img} alt={name} />
      </div> */}
      <div className={s.info_cont}>
        <div>
          {name.map((p) => <div key={p.title}>{p.title} Cant:{p.cartQuantity}</div>)}
        </div>
        <div>
          Para: {user_name}
        </div>
        <div>
          Direccion:{address}
        </div>
        <div>
          Estado:{status}
        </div>
        {status === 'proceso'
          ? <>
            <button onClick={() => handleStatus(id, 'finalizado')}>Finalizar</button>
            <button onClick={() => handleStatus(id, 'pending')}>Pendiente</button>
          </>
          : <></>
        }
        {status === 'finalizado'
          ? <button onClick={() => handleStatus(id, 'errorProceso')}>En proceso</button>
          : <></>
        }
        {status === 'pending'
          ? <button onClick={() => handleStatus(id, 'proceso')}>En proceso</button>
          : <></>
        }
      </div>
    </div>
  )
}

const Orders = () => {

  const [pendingOrders, setPendingOrders] = useState([])

  const [inProccessOrders, setInProccessOrders] = useState([])

  const [finishedOrders, setFinishedOrders] = useState([])

  const handleStatusChange = (orderId, status) => {
    axios.post(`http://localhost:3001/shop?option=status`, { delivery_status: status, orderId: orderId })
      .then((r) => {
        if (status === 'proceso') {
          if (r.data.status) {
            setInProccessOrders(r.data.orders)
            // setPendingOrders((o)=>o.filter(o=>o.id!==orderId))
            axios.get(`http://localhost:3001/orders/ordenes?deliveryStatus=pending`).then(r => setPendingOrders(r.data.orders))
          }
          return
        }
        if (status === 'pending') {
          if (r.data.status) {
            setPendingOrders(r.data.orders)
            axios.get(`http://localhost:3001/orders/ordenes?deliveryStatus=proceso`).then(r => setInProccessOrders(r.data.orders))
          }
          return
        }
        if (status === 'finalizado') {
          if (r.data.status) {
            setFinishedOrders(r.data.orders)
            axios.get(`http://localhost:3001/orders/ordenes?deliveryStatus=proceso`).then(r => setInProccessOrders(r.data.orders))
          }
          return
        }
        if (status === 'errorProceso') {
          if (r.data.status) {
            setInProccessOrders(r.data.orders)
            axios.get(`http://localhost:3001/orders/ordenes?deliveryStatus=finalizado`).then(r => setFinishedOrders(r.data.orders))
          }
          return
        }
      })
  }

  const params = useParams()

  const { id } = params

  // useEffect(() => {
  //   axios.get(getOrdersByRestId(id))
  //     .then(r => {
  //       setOrders(r.data)
  //     })
  //     .catch(e => console.log(e))
  // }, [])

  useEffect(() => {
    axios.get(`http://localhost:3001/orders/ordenes?deliveryStatus=pending`).then(r => setPendingOrders(r.data.orders))
    axios.get(`http://localhost:3001/orders/ordenes?deliveryStatus=proceso`).then(r => setInProccessOrders(r.data.orders))
    axios.get(`http://localhost:3001/orders/ordenes?deliveryStatus=finalizado`).then(r => setFinishedOrders(r.data.orders))
  }, [])

  return (
    <div className={s.cont}>
      <div className={s.state_column}>
        <div className={s.state}>Pendientes</div>
        <div className={s.orders_cont}>
          {pendingOrders.length
            ? pendingOrders.map((o, i) => <Order id={o._id} handleStatus={handleStatusChange} key={i} name={o.products} status={o.delivery_status} user_name={o.user_name} address={o.address.address_line_1} />)
            : <></>
          }
        </div>
      </div>
      <div className={s.state_column}>
        <div className={s.state}>En proceso</div>
        <div className={s.orders_cont}>
          {inProccessOrders.length
            ? inProccessOrders.map((o, i) => <Order id={o._id} handleStatus={handleStatusChange} key={i} name={o.products} status={o.delivery_status} user_name={o.user_name} address={o.address.address_line_1} />)
            : <></>
          }
        </div>
      </div>
      <div className={s.state_column}>
        <div className={s.state}>Finalizados</div>
        <div className={s.orders_cont}>
          {finishedOrders.length
            ? finishedOrders.map((o, i) => <Order id={o._id} handleStatus={handleStatusChange} key={i} name={o.products} status={o.delivery_status} user_name={o.user_name} address={o.address.address_line_1}/>)
            : <></>
          }
        </div>
      </div>
    </div>
  )
}

export default Orders