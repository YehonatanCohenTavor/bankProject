import React, { useRef, useState,useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/loginPage.css';
import { AppContext } from '../App';


function Login() {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const inputRef = useRef(null);
    const { logIn,getCookies } = useContext(AppContext);

    useEffect(()=>{
        checkIfCanLogIn()
    },[])

    const checkIfCanLogIn = async() => {
        if(getCookies('onlineUser') != ''){
            const res = await fetch(`http://localhost:8000/users/${getCookies('onlineUser')}`)
            const data = await res.json();
            navigate(`/UserPage/${data.user_id}`)
            console.log(data);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await fetch(`http://localhost:8000/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (res.ok) {
            let data = await res.json();
            logIn(data);
        } else inputRef.current.focus();
    }

    return (
        <div id='loginContainer'>
            <form onSubmit={handleSubmit} id='loginForm'>
                <h2>Login</h2>
                <div className='inputDiv'>
                    <label>Username:
                        <input ref={inputRef} value={username} onChange={e => setUsername(e.target.value)} required></input>
                    </label>
                </div>
                <div className='inputDiv'>
                    <label>Password:
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required></input>
                    </label>
                </div>
                <div>
                    <button type='submit'>Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;