import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import CreateFood from './components/RestaurantComponents/CreateFood/CreateFood';
import LandingPage from './components/LandingPage/LandingPage';
import Shopping from './components/Shopping/Shopping'
import  { Login, Register } from './components/LoginRegister/Loginregister';

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/register' element={<Register/>} />
        <Route path='/restaurantes' element={<Home/>}/>
        <Route path='landingPage' element={<LandingPage />}/>
        <Route path='/newFood' element={<CreateFood />} />
        <Route path='shopping' element={<Shopping />}/>
      </Routes>
    </div>
  );
}

export default App;
