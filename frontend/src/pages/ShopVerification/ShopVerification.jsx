import axios from 'axios'
import React, { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

import { restaurantVerificationURL, verifyRestaurantByIdURL } from '../../assets/endpoints'
import { fetchCreds } from '../../Redux/thunks/userThunks'


const ShopVerification = () => {
    const params = useParams()

    const {id} = params

    const navigate = useNavigate()

    const dispatch = useDispatch()

    useEffect(()=>{
        axios.get(verifyRestaurantByIdURL(id))
        .then((r)=>{
            if(!r.data.status)navigate('/negocios')
        })
    },[id,navigate])

    const [code,setCode] = useState('')
    const[error,setError] = useState('')
    const submit = async(e)=>{
        const body={
            code,
            restaurantId: id
        }
        e.preventDefault()
        const verifyCodeAnswer = await axios.post(restaurantVerificationURL, body)

        if (verifyCodeAnswer.data.status) {
            const {token} = verifyCodeAnswer.data
            window.localStorage.removeItem('token')
            window.localStorage.setItem('token',token)
            dispatch(fetchCreds(token))
            navigate(`/negocios/${id}`)
            return
        }
        setError(verifyCodeAnswer.data.msg)
    }



  return (
    <div>
            <form onSubmit={submit}>
                <input type="text" value={code} onChange={(e) => setCode(e.target.value)} autoFocus />
                <button type='submit'>Verificar</button>
            </form>
            {error !== ''
                ? <h5>{error}</h5>
                : <></>
            }
        </div>
  )
}

export default ShopVerification