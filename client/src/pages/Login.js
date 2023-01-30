import React, { useRef, useState } from 'react';
import '../login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = async(e) => {
        e.preventDefault();
        let res = await fetch(`http://localhost:8000/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (res.ok) {
            let data = await res.json();
            sessionStorage.setItem('onlineUser', JSON.stringify(data))
        } else inputRef.current.focus();
    }

    return ( 
        <div id='loginContainer'>
            <form onSubmit={handleSubmit} id='loginForm'>
                <div className='inputDiv'>
                    <label>Username: 
                        <input ref={inputRef} value={username} onChange={e=>setUsername(e.target.value)} required></input>
                    </label>
                </div>
                <div className='inputDiv'>
                    <label>Password: 
                        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} required></input>
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