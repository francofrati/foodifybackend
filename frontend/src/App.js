import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home.jsx';
import CreateFood from './components/RestaurantComponents/CreateFood/CreateFood';
import LandingPage from './components/LandingPage/LandingPage';
import Shopping from './components/Shopping/Shopping'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='landingPage' element={<LandingPage />}/>
        <Route path='/newFood' element={<CreateFood />} />
        <Route path='shopping' element={<Shopping />}/>
      </Routes>
    </div>
  );
}

export default App;
