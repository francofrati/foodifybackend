import React from 'react'
import { useSelector } from 'react-redux'
import{FaSearch} from 'react-icons/fa'

import useAuth from '../../../hooks/useAuth'
import categories from '../../../assets/categories'
import s from './SearchBar.module.css'

const SearchBar = () => {

    const {user} = useSelector((state)=>state.user)

    const handleCategory =()=>{}

    useAuth()

    return (
        <div className={s.cont}>
            <div className={s.search_greet_cont}>
                {user
                ?<div className={s.greet_cont}>
                    <p className={s.greet}>Hola {user.name}, que vas a pedir hoy?</p>
                </div>
                :<></>}
                <div className={s.search_cont}>
                    <input 
                    className={s.search_input}
                    type="text" 
                    placeholder='Buscar en Foodify...'
                    />
                    <FaSearch 
                        className={s.search_icon}
                        style={{'color':'#20B5E5'}}
                    />
                </div>
            </div>
            <div className={s.categories_cont}>
                {categories.map((c)=>(
                    <div key={c.name}>
                        <div>
                            <div onClick={handleCategory} className={s.logo_cont}>
                                <img className={s.logo_img} src={c.img} alt={c.name} />
                            </div>
                        </div>
                        <div className={s.name_cat_cont}>
                            <span className={s.name_cat}>{c.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SearchBar