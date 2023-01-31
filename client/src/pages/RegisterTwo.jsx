import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../register.css';

function RegisterTwo() {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState({
        username: '',
        password: '',
        repeat_password: ''
    })
    const [error, setError] = useState('');

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let errors = [];
        if (state.password.length < 2) errors.push("password");
        if (state.password !== state.repeat_password) errors.push("repeat_password");
        if (state.username < 4) errors.push("Username");
        for (let key in state) {
            let element = document.getElementsByName(key);
            element[0].classList.remove("error");
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                let element = document.getElementsByName(error);
                element[0].classList.add("error");
            })
        } else {
            let response = await fetch('http://localhost:8000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...location.state, ...state })
            })
            let data = await response.json();
            setError(data.sqlMessage);
        }
    }

    return (
        <div className='registerContainer'>
            <form className='registerForm' onSubmit={handleSubmit}>
                <div className='inputDiv'>
                    <label>Username:
                        <input type="text" value={state.username} onChange={handleChange} name="username"></input>
                    </label>
                </div>
                <div className='inputDiv'>
                    <label>Password:
                        <input type="password" value={state.password} onChange={handleChange} name="password"></input>
                    </label>
                </div>
                <div className='inputDiv'>
                    <label>Repeat Password:
                        <input type="password" value={state.repeat_password} onChange={handleChange} name="repeat_password"></input>
                    </label>
                </div>
                <p className='errorP'>{error}</p>
                <div>
                    <button type="submit">Sign up</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterTwo;