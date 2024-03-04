import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Authentication from './pages/Authentication/Authentication';
import { Route, Routes } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import HomePage from './pages/HomePage/HomePage.jsx'
import Message from './pages/Message/Message.jsx'
import { getUserProfile } from './redux/auth/auth.action.js';

function App() {
  const dispatch = useDispatch();
  const auth = useSelector(store => store.auth)

  useEffect(() => {
    const jwt = localStorage.getItem("jwt")
    if (jwt) {
      dispatch(getUserProfile(jwt))
    }
  }, [auth.jwt])

  return (
    <div className="App">
      <Routes>
        <Route path='/*' element={auth.user ? <HomePage /> : <Authentication />} />
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={<Authentication />} />
      </Routes >
    </div>
  );
}

export default App;
