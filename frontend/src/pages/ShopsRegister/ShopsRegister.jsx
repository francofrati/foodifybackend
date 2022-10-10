import React from 'react'
import {useNavigate} from 'react-router-dom'

import axios from 'axios'

import { Form, Formik } from "formik"

import CustomInput from './CustomInput/CustomInput'
import { preVerifyRestaurantRegistrationURL, registerRestaurantURL } from '../../assets/endpoints'
import { useState } from 'react'
import { restaurantRegistrationSchema, restaurantRegistrationSchemaStepTwo } from '../../schemas/restaurantRegistrationSchema'



const FirstStep = ({ changeForm, globalValue }) => {

  const handleSubmit = async(values) => {
    const body = {
      name: values.name,
      email: values.email,
      country: values.country,
      state: values.state,
      city: values.city,
      owner_name: values.owner_name,
      phone: values.phone
    }
    axios.post(preVerifyRestaurantRegistrationURL, body)
      .then((r) => {
        if (r.data.status) {
          globalValue(body)
          changeForm();
        }
      })
      .catch((e) => {
        console.log(e)
        alert('Chequear error en consola')
      })
  }

  return (
    <Formik
      initialValues={{
        country: '',
        state: '',
        city: '',
        name: '',
        owner_name: '',
        email: '',
        phone: ''
      }}
      onSubmit={handleSubmit}
      validationSchema={restaurantRegistrationSchema}
    >
      <Form style={{ backgroundColor: 'white' }}>
        <CustomInput
          name='country'
          placeholder='Pais'
          type='text'
        />
        <CustomInput
          name='state'
          placeholder='Estado o Provincia'
          type='text'
        />
        <CustomInput
          name='city'
          placeholder='Ciudad'
          type='text'
        />
        <CustomInput
          name='name'
          placeholder='Nombre de la Tienda'
          type='text'
        />
        <CustomInput
          name='owner_name'
          placeholder='Nombre Completo'
          type='text'
        />
        <CustomInput
          name='email'
          placeholder='Email'
          type='text'
        />
        <CustomInput
          name='phone'
          placeholder='Numero de telefono'
          type='text'
        />
        <button type='submit'>Enviar</button>
      </Form>
    </Formik>
  )
}



const SecondStep = ({ globalValue, prevValues }) => {

  const navigate = useNavigate()

  const handleSubmit = (values) => {
    const body = {
      password: values.password,
      image: values.brandLogo,
      email: prevValues.email
    }

    axios.post(registerRestaurantURL,body)
    .then((r)=>{
      if(r.data.status){
        navigate(r.data.path)
      }
    })
  }

  return (
    <Formik
      initialValues={{
        brandLogo: '',
        password: '',
        confirmPassword: ''
      }}
      onSubmit={handleSubmit}
      validationSchema={restaurantRegistrationSchemaStepTwo}
    >
      <Form>
        <CustomInput
          name='brandLogo'
          placeholder='Logo de tu negocio'
          type='text'
        />
        <CustomInput
          name='password'
          placeholder='Contraseña'
          type='password'
        />
        <CustomInput
          name='confirmPassword'
          placeholder='Confirmar contraseña'
          type='password'
        />
        <button type='submit'>Registrarse</button>
      </Form>
    </Formik>
  )
}


const ShopsRegister = () => {

  const [step, setStep] = useState(1)

  const [bothFormValues, setBothFormValues] = useState({})

  const handleValues = (values) => {
    setBothFormValues(prevState => ({
      ...prevState,
      ...values
    }))
  }

  const changeForm = () => {
    setStep(2)
  }

  return (
    <>
      {step === 1 && <FirstStep changeForm={changeForm} globalValue={handleValues} />}
      {step === 2 && <SecondStep globalValue={handleValues} prevValues={bothFormValues} />}
    </>
  )
}

export default ShopsRegister