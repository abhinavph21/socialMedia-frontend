import React from 'react';
import logo from './logo.svg';
import './App.css';
import Authentication from './pages/Authentication/Authentication';
import { Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage.jsx'
import Message from './pages/Message/Message.jsx'

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/*" element={<HomePage />} />
        <Route path="/message" element={<Message />} />
        <Route path="/*" element={<Authentication />} />
      </Routes >
    </div>
  );
}

export default App;
