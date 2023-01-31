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
export const AppContext = createContext();


function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const user_id = location.pathname.split("/")[2];
  const [existsCookie, setExistsCookie] = useState(true);

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

  useEffect(() => {
    if(user_id === undefined) {
      return;
    }
    if (getCookies("onlineUser") === '' && existsCookie === false) {
      navigate("/Home");
    } else {
      setExists(true);
      if (getCookies("onlineUser") !== '') {
        fetch(`http://localhost:8000/users/${getCookies("onlineUser")}`)
          .then(response => response.json())
          .then(data => {
            navigate(`UserPage/${data.user_id}`)
          })
      }
    }
  }, [user_id]);

  function logIn(data) {
    if (data.token === undefined) {
      document.cookie = `onlineUser=${data.token};expires=${data.expiration_date}`;
      navigate(`/UserPage/${data.user_id}`);
    } else {
      console.log('hiiiiii');
      document.cookie = `onlineUser=${data.token};expires=${data.expiration_date}`;
      navigate(`/UserPage/${data.user_id}`);
    }
    // if (user_id != data.user_id) {
    //   navigate(`/UserPage/${user_id}`);
    // }
  }
  function logOut() {
    sessionStorage.removeItem("activeUser");
    navigate("/Home");
  }
  return (
    <AppContext.Provider value={{ logIn, logOut }}>
      <Routes>
        <Route index element={<Navigate replace to="/Home" />}></Route>
        <Route path="/Home" element={<Home />}></Route>
        <Route path='/UserPage/:user_id' element={<NavBar />}>
          <Route index element={<UserPage />}></Route>
        </Route>
        <Route path='/AdminPage/:user_id' element={<AdminPage />}></Route>
        <Route path="/Login" element={<Login />}></Route>
        <Route path="/Register" >
          <Route index path="" element={<RegisterOne />}></Route>
          <Route path="next" element={<RegisterTwo />}></Route>
        </Route>
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
