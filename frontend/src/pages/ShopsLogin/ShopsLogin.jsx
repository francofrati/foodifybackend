import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import s from './ShopsLogin.module.css'



const ShopsLogin = () => {

    return (
        <div className={s.cont} >
            <div>
                <Link to={'/negocios/registro'}>
                    <button className={s.btn_register}>Registrate</button>
                </Link>
            </div>
            <div>
                <h1>Form de Login</h1>
            </div>
        </div>

    )
}

export default ShopsLogin