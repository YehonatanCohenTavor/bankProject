import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../styles/register.css';

function RegisterOne() {
    const navigate = useNavigate();
    const location = useLocation();
    const [state, setState] = useState({
        first_name:'',
        last_name: '',
        email: '',
        identity_number:'',
        address: '',
        birth_date: '',
        phone: '',
        branch: 'CHI'
    })

    useEffect(() => {
        if (location.state) setState({ ...location.state });
    },[])

    const handleChange = ({ target }) => {
        const { name, value } = target;
        setState(prev => ({ ...prev, [name]: value }))

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        let errors = [];
        let formdata = { ...state };
        if (formdata.first_name.length < 2 ) errors.push('first_name');
        if (formdata.last_name.length < 2 ) errors.push('last_name');
        if (!(/^\d{9}$/).test(formdata.identity_number)) errors.push('identity_number');
        if (formdata.address.length < 3) errors.push('address');
        if (!/^\d{3}-?\d{3}-?\d{4}$/.test(formdata.phone)) errors.push('phone');
        for (let key in formdata) {
            let element = document.getElementsByName(key);
            element[0].classList.remove("error");
        }
        if (errors.length > 0) {
            errors.forEach(error => {
                let element = document.getElementsByName(error);
                element[0].classList.add("error");
            })
        } else {
            navigate("/register/next",{state:{...formdata}})
         }
    }

    return (
        <div className="registerContainer">
            <form className="registerForm" onSubmit={handleSubmit}>
                <h2>Sign Up</h2>
                <div className='inputDiv'>
                    <label>First Name:
                        <input type="text" value={state.first_name} name="first_name" onChange={(handleChange)} />
                    </label>
                </div>
                <div className='inputDiv'>
                    <label>Last Name:
                        <input type="text" value={state.last_name} name="last_name" onChange={(handleChange)} />
                    </label>
                </div>
                <div className='inputDiv'>
                    <label>Email:
                        <input type="email" value={state.email} name="email" onChange={(handleChange)} required/>
                    </label>
                </div>
                <div className='inputDiv'>
                    <label> ID number:
                        <input type="text" value={state.identity_number} name="identity_number" onChange={(handleChange)} />
                    </label>
                </div>
                <div className='inputDiv'>
                    <label> Address:
                        <input type="text" value={state.address} name="address" onChange={(handleChange)} />
                    </label>
                </div>
                <div className='inputDiv'>
                    <label>Birth date:
                        <input type="date" value={state.birth_date} name="birth_date" onChange={(handleChange)} min="1903-01-01" max='2007-01-01' required/>
                    </label>
                </div>
                <div className='inputDiv'>
                    <label> Phone number:
                        <input type="tel" value={state.phone} name="phone" onChange={(handleChange)} />
                    </label>
                </div>
                <div className='inputDiv'>
                    <label> Branch:
                        <select name="branch" onChange={handleChange}>
                            <option value='CHI'>Chicago</option>
                            <option value='IL'>Israel</option>
                            <option value='LA'>Los Angeles</option>
                            <option value='NY'>New York</option>
                        </select>
                    </label>
                </div>
                <div className='errorDiv'>
                    
                </div>
                <div>
                    <button type="submit">Next</button>
                </div>
            </form>
        </div>
    );
}

export default RegisterOne;