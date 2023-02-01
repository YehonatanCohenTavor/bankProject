import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { AppContext } from "../App";

function CreateAccount() {
    const [serverResponse, setServerResponse] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        type: 'checking'
    })
    const location = useLocation();
    const user_id = location.pathname.split('/')[2];
    const { authorization } = useContext(AppContext);

    useEffect(() => {
        authorization();
    }, [])

    const handleChange = ({ target }) => {
        let { name, value } = target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/accounts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formData, user_id: user_id })
        })
            .then(response => response.json())
            .then(data => {
                setServerResponse(data);
            })

    }

    return (
        <div>
            <form onSubmit={(handleSubmit)}>
                <label>Account name
                    <input type="text" value={formData.name} onChange={handleChange} name='name' />
                </label>
                <label>
                    <select name='type' onChange={handleChange}>
                        <option value="checking">Checking</option>
                        <option value="loan">Loan</option>
                        <option value="saving">Saving</option>
                    </select>
                </label>
                <p>{serverResponse}</p>
                <button type='submit'>Create Account</button>
            </form>
        </div>
    );
}

export default CreateAccount;