import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Formik, Form } from 'formik'

import CustomInput from '../../components/LoginRegister/CustomInput'

import s from './ShopsLogin.module.css'
import axios from 'axios'
import { loginRestaurantURL } from '../../assets/endpoints'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCreds } from '../../Redux/thunks/userThunks'



const ShopsLogin = () => {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const {user} = useSelector(state=>state.user)

    const [error,setError] = useState(null)

    const handleLogin = (values)=>{
        
        axios.post(loginRestaurantURL,values)
        .then((r)=>{
            const {status,token} = r.data
            if(status){
                window.localStorage.setItem('token',token)
                dispatch(fetchCreds(token))                
                console.log(user)
            }
        })
        .catch(e=>{
            setError(e.response.data.msg)
        })
    }

    useEffect(()=>{
        if(user){
            navigate(`/negocios/${user.id}`)
        }
    },[user,navigate])

    return (
        <div className={s.cont} >
            <div>
                <Link to={'/negocios/registro'}>
                    <button className={s.btn_register}>Registrate</button>
                </Link>
            </div>
            <div>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={handleLogin}
                >
                    <Form>
                        <CustomInput
                            placeholder='Email'
                            name='email'
                            type='text'
                        />
                        <CustomInput
                            placeholder='Password'
                            name='password'
                            type='password'
                        />
                        <p>{error}</p>
                        <button type='submit'>Iniciar Sesion</button>
                    </Form>
                </Formik>
            </div>
        </div>

    )
}

export default ShopsLogin