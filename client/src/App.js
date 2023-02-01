import logo from './logo.svg';
import './App.css';
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";
import React, { useState, createContext, useEffect } from "react";
import Home from "./pages/Home";
import Login from './pages/Login';
import RegisterOne from './pages/RegisterOne';
import RegisterTwo from './pages/RegisterTwo';
import UserPage from './pages/UserPage';
import AdminPage from './pages/adminPage';
import Statistics from './pages/statistics';
import Transfer from './pages/transfer';
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
        <Route path='/AdminPage/:user_id' element={<AdminPage />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" >
          <Route index path="" element={<RegisterOne />}></Route>
          <Route path="next" element={<RegisterTwo />}></Route>
        </Route>
        <Route path='/stats' element={<Statistics />}></Route>
        <Route path='/transfer' element={<Transfer />}></Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
