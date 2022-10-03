import React from 'react'
import {useField} from 'formik'

const CustomInput = ({ label, ...props }) => {

    const[field,meta,helpers] = useField(props)
   
    return (
        <div>
            <label>{label}</label>
            <input
                {...field}
                {...props}
            />
        </div>
    )
}

export default CustomInput