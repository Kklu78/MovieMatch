import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import Layout from "../Layout/Layout";
import Home from "../Home/Home";
import MoviePage from '../MoviePage/MoviePage'


function App() {
  return (
      <Routes>
          <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />          

          <Route path="/login" element={<LoginPage />} />          
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/:movie' element={<MoviePage />} />
          </Route>
      </Routes>
  );
}

export default App;
