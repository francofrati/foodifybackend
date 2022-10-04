import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

import { fetchAllRestaurants } from "../../Redux/thunks/restaurantsThunks.js";
import SearchBarR from "./SearchBar/SearchBar.jsx";
import Filter from "./Filter/Filter.jsx";
import Restaurants from "../../components/Restaurants/Restaurants";

import s from './Home.module.css'


const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAllRestaurants())
  }, [dispatch])

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