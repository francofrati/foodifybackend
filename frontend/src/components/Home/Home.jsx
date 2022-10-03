import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllRestaurants } from "../../Redux/thunks/restaurantsThunks.js";
import Restaurants from "../Restaurants/Restaurants.jsx";
import Filter from "./Filter/Filter.jsx";
import { fetchAllFoods } from "../../Redux/thunks/foodsThunks.js";
import FoodList from "../FoodList/FoodList.jsx";
import s from './Home.module.css'
import SearchBar from "../SearchBar/SearchBar.jsx";
import SearchBarR from "./SearchBar/SearchBar.jsx";

const Home = () => {



    const dispatch = useDispatch()

  const { restaurants } = useSelector(state => state.restaurants)

  const [lnlt, setLnlt] = useState(null)


  useEffect(() => {
    console.log(lnlt)
  }, [lnlt])


  useEffect(() => {
    dispatch(fetchAllRestaurants())
    window.navigator.geolocation.getCurrentPosition((l) => {
      setLnlt({
        lt: l.coords.latitude,
        ln: l.coords.longitude
      })
    },
      (e) => {
        console.log(e)
      })
  }, [])

  return (
    <div className={s.container}>
      <SearchBarR />
      <div className={s.filter_rest_cont}>
        <Filter />
        <Restaurants />
      </div>
    </div>
  )
    }

export default Home