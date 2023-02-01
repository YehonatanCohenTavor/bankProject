import React, { useContext, useState } from "react";
import { NavLink, Outlet, useParams, Link, useLocation } from "react-router-dom";
import '../../styles/Navbar.css';
import { AppContext } from "../../App";

export default function NavBar() {
    const location = useLocation();
    const user_id = location.pathname.split("/")[2];
    const [isOpen, setIsOpen] = useState(false);
    const { logIn,logOut, authorization } = useContext(AppContext);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <header className="header">
                <nav className="navbar">
                    <div className="logo">
                        <a href="/Home" className="nav-logo">HILMA Bank</a>
                    </div>
                    <ul className={isOpen ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <NavLink to={`/UserPage/${user_id}`}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`/UserPage/${user_id}/Info`}>Personal Info</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`/UserPage/${user_id}/AllTransactions`}>Transactions</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`/UserPage/${user_id}/stats`}>Statistic</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`/UserPage/${user_id}/createAccount`}>New Account</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`/UserPage/${user_id}/creditCards`}>Credit Cards</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to={`/UserPage/${user_id}/transfer`}>New Transaction</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink onClick={(e) => {e.preventDefault();logOut();}} to='/Home'>Log out</NavLink> 
                            {/* <button onClick={logout}>Log Out</button> */}
                        </li>
                    </ul>
                    <div className={isOpen ? "hamburger active" : "hamburger"} onClick={handleClick}>
                        <span className="bar"></span>
                        <span className="bar"></span>
                        <span className="bar"></span>
                    </div>
                </nav>
            </header>
            {/* <NavLink to={`/UserPage/${user_id}/Info`}>Personal Info</NavLink>
            <NavLink to={`/UserPage/${user_id}/ChangeInfo`}>Change Personal Info</NavLink>
            <NavLink to={`/UserPage/${user_id}/AllTransfers`}>Transfers</NavLink>
            <NavLink to={`/UserPage/${user_id}/Statistic`}>Statistic</NavLink>
            <NavLink to={`/UserPage/${user_id}/AddNewAccount`}>New Account</NavLink>
            <NavLink to={`/UserPage/${user_id}/AddNewCredit`}>New Credit</NavLink>
            <Link to="/Home">Log out</Link> */}
            <Outlet />
        </>
    )
}



// make a navbar react component that stick to the right corner and when you click it opens this links:
// <NavLink to={`/UserPage/${user_id}/Info`}>Personal Info</NavLink>
//                     <NavLink to={`/UserPage/${user_id}/ChangeInfo`}>Change Personal Info</NavLink>
//                     <NavLink to={`/UserPage/${user_id}/AllTransfers`}>Transfers</NavLink>
//                     <NavLink to={`/UserPage/${user_id}/Statistic`}>Statistic</NavLink>
//                     <NavLink to={`/UserPage/${user_id}/AddNewAccount`}>New Account</NavLink>
//                     <NavLink to={`/UserPage/${user_id}/AddNewCredit`}>New Credit</NavLink>
//                     <Link to="/Home">Log out</Link>

// make also a beautiful css for the whole navbar 
// send the full code for me