import React,{ useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { Form, Formik } from "formik"
import axios from "axios"

import { fetchCreds } from "../../Redux/thunks/userThunks"
import CustomInput from "../../components/LoginRegister/CustomInput"

import { registrationSchema } from "../../schemas/registrationSchema"

import { signUpRestaurantURL } from "../../assets/endpoints"

import s from './Register.module.css'

const Register = () => {

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
            const call = await axios.post(signUpRestaurantURL, values)

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
                <h1 style={{ 'color': 'white' }}>Registrate como usuario</h1>
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

export default Register