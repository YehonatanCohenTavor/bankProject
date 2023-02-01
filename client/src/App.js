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
import NavBar from './pages/components/Navbar';
import ErrorPage from './pages/components/ErrorPage';
import Statistics from './pages/statistics';
import Transfer from './pages/transfer';
import CreateAccount from './pages/createAccount';
import Info from './pages/Info';
import UserStats from './pages/userStats';
import CreditCards from './pages/creditCards';
import AllTransactions from './pages/AllTransactions';
import Footer from './pages/components/Footer';
export const AppContext = createContext();


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.pathname.split("/")[2];
  const [existsUser, setExistsUser] = useState(false);

  const getCookies = (cname) => {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  const authorization = async (func) => {
    const res = await fetch(`http://localhost:8000/${user_id}/authorization`, {
      method: "GET",
      credentials: "include",
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    });
    const data = await res.json();
    if (data) {
      if(func) func();
    } else {
      navigate("/ErrorPage")
    }
  }

  useEffect(() => {
  }, []);

  function logIn(data) {
    if (data.token === undefined) {
      document.cookie = `onlineUser=${data.existToken};expires=${data.expiration_date}`;
    }
    else {
      document.cookie = `onlineUser=${data.token};expires=${data.expiration_date}`;
    }
    // if (user_id != data.user_id) {
      if(data.permission === 2){
        navigate(`/UserPage/${data.user_id}`);
      }
      else {
        navigate(`/AdminPage/${data.user_id}`);
      }
    // }
  }

  function logOut() {
    document.cookie = "onlineUser=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    navigate("/Home");
  }

  return (
    <AppContext.Provider value={{ logIn, logOut, authorization,getCookies }}>
      <Routes>
        <Route index element={<Navigate replace to="/Home" />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path="/ErrorPage" element={<ErrorPage />}></Route>
        <Route path='/UserPage/:user_id' element={<NavBar />}>
          <Route index element={<UserPage />}></Route>
          <Route path='stats' element={<UserStats />}></Route>
          <Route path='transfer' element={<Transfer />}></Route>
          <Route path='createAccount' element={<CreateAccount />}></Route>
          <Route path='Info' element={<Info />}></Route>
          <Route path='creditCards' element={<CreditCards/>}></Route>
          <Route path='AllTransactions' element={<AllTransactions/>}></Route>
        </Route>
        <Route path='/AdminPage/:user_id' element={<AdminPage />}></Route>
        <Route path='/AdminPage/:user_id/stats' element={<Statistics />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" >
          <Route index path="" element={<RegisterOne />}></Route>
          <Route path="next" element={<RegisterTwo />}></Route>
        </Route>
        <Route
               path="*"
               element={<h1>404 Page not found!</h1>}
            />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
