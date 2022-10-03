import React from 'react'
import { Formik, Form } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CustomInput from './CustomInput';
import { loginURL, signUpURL } from '../../assets/endpoints';
import { fetchCreds } from '../../Redux/thunks/userThunks';
import s from './login.module.css'
import useAuth from '../../hooks/useAuth';
import { registrationSchema } from '../../schemas/registrationSchema';
import { loginSchema } from '../../schemas/loginSchema';

//LOS ESTILOS HAY QUE CAMBIARLOS, NO DEJARLOS INLINE.

export const Login = () => {

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
                <h1 style={{ 'color': 'white' }}>Log In Demo</h1>
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


export const Register = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user){
            navigate('/restaurantes')
        }
    },[user,navigate])


    const onSubmit = async (values) => {
        try {
            const call = await axios.post(signUpURL, values)

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
                <h1 style={{ 'color': 'white' }}>Log In Demo</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        confirmPassword: '',
                        name: '',
                        username: ''
                    }}
                    onSubmit={onSubmit}
                    validationSchema={registrationSchema}
                >
                    {(props) => (
                        <Form>
                            <div style={{ 'display': 'flex', 'flexDirection': 'column', 'gap': '3rem' }}>

                                <CustomInput
                                    name='name'
                                    label='Nombre completo:'
                                    type='text'
                                    placeholder='Food Foodify'
                                />
                                <CustomInput
                                    name='username'
                                    label='Elegi un nombre de usuario:'
                                    type='text'
                                    placeholder='foodify'
                                />
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
                                <CustomInput
                                    name='confirmPassword'
                                    label='Password:'
                                    type='password'
                                    placeholder='Foodi1'
                                />
                                <button type='submit'>Registrarse</button>
                            </div>
                        </Form>
                    )}
                </Formik>

            </div>
        </div>
    )
}

const SignPage = () => {
    return (
        <div style={{ 'display': 'flex', 'justifyContent': 'space-around' }}>
            <Login />
            <Register />
        </div>
    )
}

export default SignPage