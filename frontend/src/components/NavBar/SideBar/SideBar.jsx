import React from 'react'

import { motion, AnimatePresence } from 'framer-motion'

import s from './SideBar.module.css'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { BsFillTriangleFill } from 'react-icons/bs'

const CustomOptions = ({ name, path }) => {
    return (
        <div className={s.btn_option_cont}>
            <Link style={{ outline: 'none', textDecoration: 'none', color: 'white' }} to={path}>
                <span>{name}</span>
            </Link>
        </div>
    )
}

const SideBar = ({ isVisible, setIsVisible }) => {

    const { user } = useSelector((state) => state.user)

    return (
        <AnimatePresence>
            {isVisible && <motion.div
                className={s.cont}
                initial={{ left: -500, }}
                animate={{ left: 0, top: 0 }}
                exit={{ left: -500, }}
                transition={{ duration: .5,delay:.2}}
                
            >
                <div className={s.hide_bar} onClick={setIsVisible}>
                    <motion.div
                    exit={{right:300}}
                    transition={{duration:.2}} 
                    className={s.icon_span}>
                        <BsFillTriangleFill />
                    </motion.div>
                </div>
                <div className={s.user_info_cont}>
                    <img className={s.avatar} src="https://www.clarin.com/img/2022/08/02/AS5MR89xx_720x0__1.jpg" alt="avatar" />
                    <div className={s.user_name}>
                        <span>
                            {user && user.name}
                        </span>
                        <span>
                            {user && user.email}
                        </span>
                    </div>
                </div>
                <div className={s.option_cont}>
                    <div className={s.sections}>
                        <CustomOptions name='Pedidos' />
                        <CustomOptions name='Mis Favoritos' />
                        <CustomOptions name='Metodos de pago' />

                    </div>
                    <div className={s.sections}>
                        <CustomOptions name='Registra tu Negocio' path={'/negocios'} />
                        <CustomOptions name='Foodify +' />

                    </div>
                    <div className={s.sections}>
                        <CustomOptions name='Cuenta' />
                        <CustomOptions name='Cerrar sesion' />

                    </div>
                </div>
            </motion.div>}
        </AnimatePresence>
    )
}


export default SideBar