import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { fetchCreds } from '../../Redux/thunks/userThunks'
import s from './Shop.module.css'

import foodify_logo from '../../assets/foodify_logo.png'
import Orders from './components/Orders/Orders'
import Products from './components/Products/Products'
import Account from './components/Account/Account'

const optionsConfig = [
    { name: 'Pedidos' },
    { name: 'Productos' },
    { name: 'Ventas' },
    { name: 'Opiniones' },
    { name: 'Cuenta' },
    { name: 'Cerrar sesion' },
]

const Options = ({ name }) => {
    return (
        <div className={s.option_cont}>
            {name}
        </div>
    )
}


const Shop = () => {

    const navigate = useNavigate()

    const { user } = useSelector(state => state.user)

    const dispatch = useDispatch()

    useEffect(() => {
        const token = window.localStorage.getItem('token')
        if (token) {
            dispatch(fetchCreds(token))
        }
    }, [])
    useEffect(() => {
        if (user && user.type !== 'restaurant') {
            navigate('/')
        }
    }, [user])


    return (
        <>
            {user && (
                <div className={s.cont}>
                    <div className={s.panel_cont}>
                        <div className={s.foody_cont}>
                            <img className={s.foodify_logo} src={foodify_logo} alt="foodify" />
                        </div>
                        <div className={s.options_cont}>
                            {optionsConfig.map(e => <Options name={e.name} />)}
                        </div>
                    </div>
                    <div className={s.content_cont}>
                        <div className={s.shop_name_cont}>
                            {user.name}
                        </div>
                        <div className={s.options_info_cont}>
                            {/* <Orders /> */}
                            {/* <Products /> */}
                            <Account />
                        </div>
                    </div>
                </div>
            )}
        </>
    )

}

export default Shop