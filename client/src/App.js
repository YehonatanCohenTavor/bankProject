import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import React, { useState, createContext, useEffect } from "react";
import Home from "./pages/Home";
import UserPage from './pages/UserPage';
export const AppContext = createContext();

function App() {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const user_id = location.pathname.split("/")[1];

  // useEffect(() => {
  //   if (sessionStorage.getItem("activeUser")) {
  //     logIn(sessionStorage.getItem("activeUser"));
  //   } else {
  //     navigate("/Home");
  //   }
  // }, [user_id]);

  // function logIn(userId) {
  //   sessionStorage.setItem("activeUser", userId);
  //   if (user_id != userId) {
  //     navigate(`/UserPage/${userId}`);
  //   }
  // }
  // function logOut() {
  //   sessionStorage.removeItem("activeUser");
  //   navigate("/Home");
  // }
  return (
    <AppContext.Provider value={'hi'}>
      <Routes>
        <Route index element={<Navigate replace to="/Home" />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path='/UserPage/:user_id' element={<UserPage />}></Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
