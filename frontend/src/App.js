import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import NavBar from './components/NavBar/NavBar';
import LandingPage from './pages/LandingPage/LandingPage';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import RestaurantPage from './pages/RestaurantPage/RestaurantPage';
import CreateFood from './components/RestaurantComponents/CreateFood/CreateFood';
import Shopping from './components/Shopping/Shopping'



function App() {
  return (
    <div className="App">
      <NavBar />      
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/restaurantes' element={<Home/>}/>
        <Route path='/restaurantes/:id' element={<RestaurantPage/>}/>
        <Route path='/restaurantes/:id/newFood' element={<CreateFood />} />
        <Route path='shopping' element={<Shopping />}/>
      </Routes>
    </div>
  );
}

export default App;
