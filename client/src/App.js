import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import React, { useState, createContext, useEffect } from "react";
import Home from "./pages/Home";
export const AppContext = createContext();

function App() {
  return (
    <AppContext.Provider value={'hi'}>
      <Routes>
        <Route index element={<Navigate replace to="/Home"/>}></Route>
        <Route path="/Home" element={<Home/>}></Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
