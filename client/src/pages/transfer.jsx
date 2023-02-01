import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function Transfer() {
    const [formState, setFormState] = useState({
        amount: '',
        reciever_account_id: '',
        description: '',
        sender_account_id: ''
    })
    const [select, setSelect] = useState([]);
    const location = useLocation();
    const user_id = location.pathname.split('/')[2];

    useEffect(() => {
        fetch(`http://localhost:8000/accounts/${user_id?user_id:3}/accounts`)
            .then(response => response.json())
            .then(data => {
                setSelect([...data]);
                setFormState(prev => ({ ...prev, sender_account_id: data[0].account_id }))
            })
    },[])


    const handleSubmit = (e) => {
        e.preventDefault();
        fetch(`http://localhost:8000/transactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...formState })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
    }

    const handleChange = ({ target }) => {
        let { name, value } = target;
        setFormState(prev => ({ ...prev, [name]: value }));
    }

    return (
        <div className='transferContainer'>
            <form onSubmit={handleSubmit}>
                <label>
                    <select type="number" value={formState.sender_account_id} onChange={handleChange}>
                        {select.map(option => {
                            return <option value={option.account_id} key={option.account_id}>{option.account_id}</option>
                        })}
                    </select>
                </label>
                <div>
                    <label>Amount:
                        <input type='number'
                            value={formState.amount}
                            onChange={handleChange}
                            name='amount' min={0} />
                    </label>
                    <label>To account:
                        <input type='number'
                            value={formState.reciever_account_id}
                            onChange={handleChange}
                            name='reciever_account_id' min={1} />
                    </label>
                </div>
                <label>Description:
                    <input name='description'
                        onChange={handleChange}
                        value={formState.description} />
                </label>
                <button type='submit'>Transfer</button>
            </form>
        </div>
    );
}

export default Transfer;