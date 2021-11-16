import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import Layout from "../Layout/Layout";


function App() {
  return (
      <Routes>
          <Route path='/' element={<Layout />}>
          <Route path="/login" element={<LoginPage />} />          
          <Route path="/signup" element={<SignupPage />} />
          </Route>
      </Routes>
  );
}

export default App;
