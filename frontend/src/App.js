import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import CreateFood from './components/RestaurantComponents/CreateFood/CreateFood';
import LandingPage from './components/LandingPage/LandingPage';
import Shopping from './components/Shopping/Shopping'
import  { Login, Register } from './components/LoginRegister/Loginregister';
import RestaurantPage from './components/RestaurantPage/RestaurantPage';
import NavBar from './components/NavBar/NavBar';


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
