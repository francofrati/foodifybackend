import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { fetchOneRestaurant} from '../../Redux/thunks/restaurantsThunks'
import { cleanRestaurantState } from '../../Redux/slices/restaurantsSlice'

import s from './RestaurantPage.module.css'
import { fetchAllFoods } from '../../Redux/thunks/foodsThunks'
import SearchBar from '../SearchBar/SearchBar'
import FoodList from '../FoodList/FoodList'

const RestaurantPage = () => {

    const { id } = useParams()

    const dispatch = useDispatch()
    const {restaurant} = useSelector(state=>state.restaurants)

    const { foods } = useSelector((state) => state.foods)
    useEffect(() => {
        if (foods.length === 0) {
          dispatch(fetchAllFoods());
        }
      }, [dispatch]);

    useEffect(()=>{
        dispatch(fetchOneRestaurant(id))
    },[])

    useEffect(()=>{
        return ()=>{
            dispatch(cleanRestaurantState())
        }
    },[])

    if(restaurant) {
        document.title =`${restaurant.name} - Foodify`
        console.log(restaurant.email)
    }

    return (


        

        <div className={s.container}>
            {restaurant&&<>
            <SearchBar />
            <div className={s.head}>
                <div>
                    <h1 className={s.title}>{restaurant.name}</h1>
                </div>
                <div>
                    <img src={restaurant.image} alt={restaurant.name} className={s.logo} />
                </div>
            </div>
            <div className={s.catalog_cont}>
                <div style={{'border':'1px solid black','width':'500px'}}>
                    <div style={{'width':'100%','border':'1px solid black'}}>Pedido</div>
                    <div style={{'width':'100%','border':'1px solid black'}}>Productos</div>
                    <div style={{'width':'100%','border':'1px solid black'}}>Precio total</div>
                </div>
                <div className={s.food_container} >
                    {/* {products.map(p => {
                        return (
                            <div key={id} className={s.food_card}>
                                <div>
                                    <img src={p.img} alt={p.name} className={s.food} />
                                </div>
                                <div>
                                    <p className={s.name}>{p.name}</p>
                                    <p className={s.price}>${p.price}</p>
                                </div>
                            </div>
                        )
                    })} */}
                     <FoodList foods={foods}/>
                </div>

            </div>
            </>}
        </div>
    )
}

export default RestaurantPage