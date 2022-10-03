import React from 'react'
import { useField } from 'formik'

import s from './CustomInput.module.css'
import { useEffect } from 'react'

const CustomInput = ({ label, ...props }) => {

    const [field, meta, helpers] = useField(props)
    // useEffect(() => {
    //     console.log(meta)
    // }, [meta])
    return (
        <div className={s.cont}>
            <label>{label}</label>
            <input
                {...field}
                {...props}
                className={meta.touched && meta.error ? s.error : ''}
            />
            {meta.touched && meta.error && <p className={s.error_text}>{meta.error}</p>}
        </div>
    )
}

export default CustomInput