import React from 'react';
import { Route, Routes } from 'react-router-dom';

import './App.css';

import NavBar from './components/NavBar/NavBar';
import LandingPage from './pages/LandingPage/LandingPage';
import Home from './pages/Home/Home';
import RestaurantPage from './pages/RestaurantPage/RestaurantPage';
import CreateFood from './components/RestaurantComponents/CreateFood/CreateFood';
import Shopping from './components/Shopping/Shopping'
import Shop from './pages/Shop/Shop'
import AccountVerification from './pages/AccountVerification/AccountVerification'




function App() {

  
  return (
    <div className="App">
      <NavBar />      
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/restaurantes' element={<Home/>}/>
        <Route path='/restaurantes/:id' element={<RestaurantPage/>}/>
        <Route path='/restaurantes/:id/newFood' element={<CreateFood />} />
        <Route path='shopping' element={<Shopping />}/>
        <Route path='/Negocios/:id' element={<Shop />} />
        <Route path='/verifyAccount/:id' element={<AccountVerification />} />
      </Routes>
    </div>
  );
}

export default App;
