import React from 'react'
import { Formik, Form } from 'formik';
import axios from 'axios';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from 'react';

import CustomInput from './CustomInput';
import { loginURL, signUpURL } from '../../assets/endpoints';
import { fetchCreds } from '../../Redux/thunks/userThunks';
import s from './login.module.css'

//LOS ESTILOS HAY QUE CAMBIARLOS, NO DEJARLOS INLINE.

export const Login = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)
    useEffect(() => {
        console.log(user)
    }, [user])
    const onSubmit = async (values) => {

        const call = await axios.post(loginURL, values)

        const { token } = call.data

        window.localStorage.setItem('token', token)
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

                <button onClick={() => {
                    const token = window.localStorage.getItem('token')
                    console.log('token: ', token)
                }}>Get Token</button>

                <button onClick={() => {
                    return dispatch(fetchCreds(window.localStorage.getItem('token')))
                }}>Get Encrypted Data</button>

                <button onClick={() => {
                    console.log(user)
                }}>log user</button>

                <h1>Email: {user.email !== '' ? user.email : 'Buscando Email'}</h1>
            </div>
        </div>
    )
}


export const Register = () => {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.user)

    const onSubmit = async (values) => {

        const call = await axios.post(signUpURL, values)

        const { token } = call.data

        window.localStorage.setItem('token', token)

        dispatch(fetchCreds(window.localStorage.getItem('token')))
    }

    return (
        <div style={{ 'padding': '3rem' }}>
            <div className={s.glass}>
                <h1 style={{ 'color': 'white' }}>Log In Demo</h1>
                <Formik
                    initialValues={{
                        email: '',
                        password: '',
                        name: '',
                        username: ''
                    }}
                    onSubmit={onSubmit}
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
                                <button type='submit'>Registrarse</button>
                            </div>
                        </Form>
                    )}
                </Formik>

                <button onClick={() => {
                    const token = window.localStorage.getItem('token')
                    console.log('token: ', token)
                }}>Get Token</button>

                <button onClick={() => {
                    return dispatch(fetchCreds(window.localStorage.getItem('token')))
                }}>Get Encrypted Data</button>

                <button onClick={() => {
                    console.log(user)
                }}>log user</button>

                <h1>Email: {user.email !== '' ? user.email : 'Buscando Email'}</h1>
            </div>
        </div>
    )
}

const SignPage = ()=>{
    return(
        <div style={{'display':'flex','justifyContent':'space-around'}}>
            <Login/>
            <Register/>
        </div>
    )
}

export default SignPage