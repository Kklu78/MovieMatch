import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import SignupPage from '../SignupPage/SignupPage';
import LoginPage from '../LoginPage/LoginPage';
import Layout from "../Layout/Layout";
import Home from "../Home/Home";
import MoviePage from '../../components/MoviePage/MoviePage'
import Profile from '../../components/Profile/Profile'
import Protected from '../../components/Protected/Protected'
import { AppContext } from '../../context/AppContext'



function App() {
  const { user } = React.useContext(AppContext)

  return (
      <Routes>
          <Route path='/' element={<Layout />}>
          <Route index element={<Protected user={user}><Home /></Protected>} />
          <Route path="/login" element={<LoginPage />} />          
          <Route path="/signup" element={<SignupPage />} />
          <Route path='/:movie' element={<Protected user={user}><MoviePage /></Protected>} />
          <Route path='/profile/:userId' element={<Protected user={user}><Profile /></Protected>} />
          </Route>
      </Routes>
  );
}

export default App;
