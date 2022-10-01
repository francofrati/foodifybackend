import React from 'react'
import { useNavigate } from 'react-router-dom'
import {TiThMenu} from 'react-icons/ti'
import {MdLocationOn} from 'react-icons/md'

import s from './NavBar.module.css'
import foodify_logo from '../../assets/foodify_logo.png'
import avatar from '../../assets/avatar.jpg'

const NavBar = () => {

    const navigate = useNavigate()

    return (
        <div className={s.cont}>
            <div className={s.menu_logo_cont}>
                <div><TiThMenu style={{'color':'#20B5E5','fontSize':'1.7rem','paddingTop':'5px'}}/></div>
                <div>
                    <img className={s.logo} onClick={()=>navigate('restaurantes')} src={foodify_logo} alt={'foodify'} />
                </div>
            </div>
            <div>
                <div className={s.ubication_cont}>
                    <MdLocationOn style={{'color':'#B65151','fontSize':'1.9rem'}}/><span>Neuquen,Neuquen,Argentina</span>
                </div>
            </div>
            <div>
                <div>
                    <div></div>
                    <div></div>
                    <div>
                        <img className={s.avatar} src={avatar} alt={'foodify'} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NavBar