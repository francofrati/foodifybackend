import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllFoods } from "../../Redux/thunks/foodsThunks.js";
import { fetchAllRestaurants } from "../../Redux/thunks/restaurantsThunks.js";
import FoodList from "../FoodList/FoodList.jsx";
import s from './Home.module.css'
// import { restaurantes } from '../../assets/restaurantes.js'
import CardRestaurante from "../CardRestaurante/CardRestaurante.jsx";

// const Home = () => {

//     const dispatch = useDispatch();

//     const { foods } = useSelector((state) => state.foods)


//     useEffect(() => {
//         if (foods.length === 0) {
//           dispatch(fetchAllFoods());
//         }
//       }, [dispatch]);

//     return(
//         <div className={s.container}>
//             <FoodList foods={foods}/>
//         </div>
//     )
// }

const Home = () => {

  const dispatch = useDispatch()
  const { restaurants } = useSelector(state => state.restaurants)
  console.log('restaurants:', restaurants)
  useEffect(() => {
    dispatch(fetchAllRestaurants())
  }, [])

  return (
    <div className={s.container}>
      <div>
        <h1 style={{ 'color': 'white', 'fontFamily': 'monospace' }}>Aca iria un Input de busqueda</h1>
      </div>
      <div style={{ 'display': 'flex' }}>
        <div style={{ 'width': '200px' }}><h2 style={{ 'color': 'white', 'fontFamily': 'monospace' }}>Filtros</h2></div>
        <div style={{ 'width': '100%' }}>
          {restaurants.length && restaurants.map((r) => {
            return (
              <CardRestaurante
                name={r.name}
                country={r.country}
                img={r.image}
                key={r.id}
                id={r.id}
              />
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home