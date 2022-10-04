import React,{ useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Form, Formik } from "formik"
import axios from "axios"

import useAuth from "../../hooks/useAuth"
import { fetchCreds } from "../../Redux/thunks/userThunks"
import CustomInput from "../../components/LoginRegister/CustomInput"

import { loginSchema } from "../../schemas/loginSchema"

import { loginURL } from "../../assets/endpoints"

import s from './login.module.css'

const Login = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    console.log(window.localStorage.getItem('token'))
    useAuth()



    const navigate = useNavigate()
    useEffect(() => {
        console.log(user)
    }, [user])

    useEffect(()=>{
        if(user){
            navigate('/restaurantes')
        }
    },[user,navigate])

    const onSubmit = async (values) => {

        try {
            const call = await axios.post(loginURL, values)

            const { token } = call.data

            window.localStorage.setItem('token', token)

            dispatch(fetchCreds(window.localStorage.getItem('token')))

            navigate('/restaurantes')
        } catch (error) {
            alert(error.response.data.Error)
            console.log(error)
        }

    }

    return (
        <div style={{ 'padding': '3rem' }}>
            <div className={s.glass}>
                <h1 style={{ 'color': 'white' }}>Inicia sesion</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={onSubmit}
                    validationSchema={loginSchema}
                >
                    {(props) => (
                        <Form>
                            <div style={{ 'display': 'flex', 'flexDirection': 'column', 'gap': '3rem' }}>

                                <CustomInput
                                    name='email'
                                    label='Email:'
                                    type='text'
                                    placeholder='foodify@foodify.com'
                                />
                                <CustomInput
                                    name='password'
                                    label='Password:'
                                    type='password'
                                    placeholder='Foodify%123'
                                />
                                <button type='submit'>Log In</button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}

export default Login