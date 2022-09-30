import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchAllRestaurants } from "../../Redux/thunks/restaurantsThunks.js";
import Restaurants from "../Restaurants/Restaurants.jsx";
import Filter from "./Filter/Filter.jsx";
import s from './Home.module.css'
import SearchBar from "./SearchBar/SearchBar.jsx";



const Home = () => {

  const dispatch = useDispatch()

  const { restaurants } = useSelector(state => state.restaurants)

  useEffect(() => {
    dispatch(fetchAllRestaurants())
  }, [])

  return (
    <div className={s.container}>
      <SearchBar />
      <div className={s.filter_rest_cont}>
        <Filter />
        <Restaurants />
      </div>
    </div>
  )
}

export default Home