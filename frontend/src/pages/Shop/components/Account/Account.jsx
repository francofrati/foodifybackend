import React from 'react'

import s from './Account.module.css'

const Account = () => {
    return (
        <div className={s.cont}>
            <div className={s.option_cont}>
                <div className={s.label}>
                    Informacion del negocio
                </div>

                <div className={s.label}>
                    Servicios
                </div>

                <div className={s.label}>
                    Informacion de la cuenta
                </div>
            </div>
            <div>

            </div>

        </div>
    )
}

export default Account