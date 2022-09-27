import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllFoods } from "../Redux/thunks/foodsThunks";

const Home = () => {

    const dispatch = useDispatch();

    const { foods } = useSelector((state) => state.foods)

    console.log(foods)

    useEffect(() => {
        if (foods.length === 0) {
          dispatch(fetchAllFoods());
        }
      }, [dispatch]);

    return(
        <>
        </>
    )
}

export default Home