import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFoods } from "../../Redux/thunks/foodsThunks.js";
import FoodList from "../FoodList/FoodList.jsx";
import s from './Home.module.css'
import SearchBar from "../SearchBar/SearchBar.jsx";
import { restaurantes } from '../../assets/restaurantes.js'
import CardRestaurante from "../CardRestaurante/CardRestaurante.jsx";

const Home = () => {

    const dispatch = useDispatch();

    const { foods } = useSelector((state) => state.foods)


    useEffect(() => {
        if (foods.length === 0) {
          dispatch(fetchAllFoods());
        }
      }, [dispatch]);

    return(
        <div className={s.container}>
            <SearchBar />
            <FoodList foods={foods}/>
        </div>
    )
}

export default Home