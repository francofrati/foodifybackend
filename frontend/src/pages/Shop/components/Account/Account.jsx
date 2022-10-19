import axios from 'axios'
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { shopPanelURL, shopPasswordChangeURL } from '../../../../assets/endpoints'
import MapComponent from '../../../../components/Map/MapComponent'
import { fetchCreds } from '../../../../Redux/thunks/userThunks'
import shopPasswordSchema from '../../../../schemas/shopPasswordSchema'
import swal from 'sweetalert'

import s from './Account.module.css'


const NegocioCustomInput = ({ info, id, name, property, ...props }) => { //Inputs Para editar Campos de cuenta

    const [editActive, setEditActive] = useState(false) //Mostrar input de edicion

    const [value, setValue] = useState({ [property]: '' }) //Valor del input

    const handleChange = (e) => {

        setValue({
            [e.target.name]: e.target.value
        })
    }

    const submitChange = () => {  //Manda a hacer el cambio a la base de datos

        axios.post(shopPanelURL('shopsettings'),
            {
                restId: id,
                shopSetting: value
            }
        )
            .then(r => {

                if (r.data.status) {
                    setEditActive(prevState => !prevState)
                    setValue({ [property]: '' })
                }
            })

            .catch(e => console.log(e))
    }

    const cancelEdit = () => {  //Cancela la edicion y restaura el value

        setValue({ [property]: '' })
        setEditActive((prevState) => !prevState)
    }


    return (
        <div className={s.negocio_input_cont}>
            <div className={s.negocio_input_option}>
                {name}
            </div>
            {!editActive
                ? <div style={{ display: 'flex', width: '100%' }}>
                    <div>{info}</div>
                    <button onClick={() => setEditActive((prevState) => !prevState)}>Editar</button>
                </div>
                : <div>
                    <div>
                        <input className={s.negocio_input}
                            name={property}
                            placeholder={info}

                            value={value[property]}
                            onChange={handleChange}
                            {...props} />
                    </div>
                    <div>
                        <button onClick={cancelEdit}>Cancelar</button>
                        <button onClick={submitChange}>Realizar cambios</button>
                    </div>
                </div>
            }
        </div>
    )
}

const NegocioSettings = () => { //Settings Relacionados al negocio en si

    const { user } = useSelector(state => state.user)

    const config = user
        ? [
            {
                name: 'Nombre de tu negocio: ',
                info: user.name,
                property: 'name'
            },
            {
                name: 'Pais: ',
                info: user.country,
                property: 'country'
            },
            {
                name: 'Estado o Provincia: ',
                info: user.state,
                property: 'state'
            },
            {
                name: 'Ciudad: ',
                info: user.city,
                property: 'city'
            },
            {
                name: 'Direccion: ',
                info: user.address,
                property: 'address'
            },
        ]
        : []

    const [coordinates, setCoordinates] = useState(user ? user.coordinates : null)

    const coordinatesToProps = (value) => {
        setCoordinates(value)
    }

    const submitCoordinates = () => {
        axios.post(shopPanelURL('shopsettings'),
            {
                restId: user.id,
                shopSetting: { coordinates: coordinates }
            }
        )
            .then(r => {
                if (r.data.status) {
                    console.log(r.data.msg)
                }
            })
            .catch(e => console.log(e))
    }

    useEffect(() => {
        console.log(coordinates)
    }, [coordinates])

    return (
        <div>
            <div>
                {config.map((e, i) => (
                    <NegocioCustomInput
                        name={e.name}
                        key={i}
                        id={user.id}
                        info={e.info}
                        property={e.property}
                        type={'text'} />)
                )}
                <div>
                    <div>
                        Marca tu ubicacion en el mapa para que los clientes te encuentran mas facil
                    </div>
                    <MapComponent
                        setCoordinates={coordinatesToProps}
                        coords={user && user.coordinates} />
                    <button
                        onClick={submitCoordinates}>
                        Cambiar ubicacion
                    </button>
                </div>
            </div>
        </div>
    )
}


const AccountSettings = () => { //Settings relacionados a la cuenta del negocio

    const { user } = useSelector(state => state.user)

    const config = user
        ? [
            {
                name: 'Email: ',
                info: user.email,
                property: 'email'
            },
            {
                name: 'Numero de telofono: ',
                info: user.phone,
                property: 'phone'
            }
        ]
        : []

    const [editPassword, setEditPassword] = useState(false)

    const submitNewPassword = (values) => {

        swal(
            {
                title: 'Estas seguro que queres cambiar la contraseña?',
                icon: 'warning',
            }
        )
            .then((value) => {
                if (value) {
                    axios.post(shopPasswordChangeURL, { restId: user.id, ...values })
                        .then((r) => {
                            if (r.data.status) {
                                swal({
                                    title: r.data.msg,
                                    icon: 'success'
                                })
                            }
                        })
                        .catch((e) => {
                            swal({
                                title: e.response.data.msg,
                                icon: 'error'
                            })
                        })

                }
            })

    }

    return (
        <div>
            <div>
                {config.map((e, i) => (
                    <NegocioCustomInput
                        name={e.name}
                        key={i}
                        id={user.id}
                        info={e.info}
                        property={e.property}
                        type={'text'} />
                ))}
                <div>
                    Cambiar contraseña
                    <button
                        onClick={() => { setEditPassword((prevState) => !prevState) }}>
                        Editar
                    </button>
                    {editPassword
                        ? <div>
                            <Formik
                                initialValues={{
                                    actualPassword: '',
                                    newPassword: '',
                                    checkNewPassword: ''
                                }}
                                validationSchema={shopPasswordSchema}
                                onSubmit={submitNewPassword}
                            >
                                {(props) => {
                                    return (
                                        <Form>
                                            <Field name='actualPassword' >
                                                {({
                                                    field,
                                                    form,
                                                    meta
                                                }) => {
                                                    return (<>
                                                        <div>Actual: <input type='password' {...field} /></div>
                                                        {meta.touched && meta.error && <p style={{ color: 'red', fontSize: '10px' }}>{meta.error}</p>}
                                                    </>
                                                    )
                                                }}
                                            </Field>
                                            <Field name='newPassword' >
                                                {({
                                                    field,
                                                    form,
                                                    meta
                                                }) => {
                                                    return (<>
                                                        <div>Nueva: <input type="password"  {...field} /></div>
                                                        {meta.touched && meta.error && <p style={{ color: 'red', fontSize: '10px' }}>{meta.error}</p>}
                                                    </>
                                                    )
                                                }}
                                            </Field>
                                            <Field name='checkNewPassword' >
                                                {({
                                                    field,
                                                    form,
                                                    meta
                                                }) => {
                                                    return (<>

                                                        <div>Confirmar nueva contraseña: <input type="password" {...field} /></div>
                                                        {meta.touched && meta.error && <p style={{ color: 'red', fontSize: '10px' }}>{meta.error}</p>}
                                                    </>
                                                    )
                                                }}
                                            </Field>
                                            <button type='submit'>Cambiar contraseña</button>
                                        </Form>
                                    )
                                }}
                            </Formik>
                        </div>
                        : <></>
                    }
                </div>
            </div>
        </div>
    )
}


const ServicioSettings = () => { //Por ahora solo para modificar el delivery

    const { user } = useSelector(state => state.user)

    const [value, setValue] = useState(user && user.delivery)

    const handleChange = (e) => {
        if (e.target.value === 'true') {
            setValue(true)
        }
        if (e.target.value === 'false') {
            setValue(false)
        }
    }

    const submitDeliveryChange = () => {
        axios.post(shopPanelURL('shopsettings'), {
            restId: user.id,
            shopSetting: {
                delivery: value
            }
        })
            .then((r) => {
                console.log(r.data.msg)
            })
            .catch(e => console.log(e))
    }

    return (
        <div>
            <div>
                Delivery:
                <select value={value} onChange={handleChange}>
                    <option value={true} >Si</option>
                    <option value={false}>No</option>
                </select>
                {
                    user.delivery !== value && <button onClick={submitDeliveryChange}>Cambiar</button>
                }
            </div>
        </div>
    )
}


const Account = ({ name }) => {

    const [option, setOption] = useState('')

    const handleOptions = (state) => {
        switch (state) {
            case 'negocio':
                return <NegocioSettings shopName={name} />
            case 'cuenta':
                return <AccountSettings />
            case 'servicio':
                return <ServicioSettings />
            default:
                return <></>
        }
    }

    return (
        <div className={s.cont}>
            <div className={s.option_cont}>
                <div className={s.label} onClick={() => setOption('negocio')}>
                    Informacion del negocio
                </div>

                <div className={s.label} onClick={() => setOption('cuenta')}>
                    Informacion de la cuenta
                </div>

                <div className={s.label} onClick={() => setOption('servicio')}>
                    Servicios
                </div>
            </div>
            <div>
                {handleOptions(option)}
            </div>

        </div>
    )
}

export default Account