import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Feed from './pages/Feed';

const isLoggedIn = false; // replace with real auth logic

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/feed" element={isLoggedIn ? <Feed /> : <Navigate to="/login" />} />
    </Routes>
  );
}
