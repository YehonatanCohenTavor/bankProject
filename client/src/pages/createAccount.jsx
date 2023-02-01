import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function CreateAccount() {
    const [formData, setFormData] = useState({
        name: '',
        type:''
    })
    const location = useLocation();
    const user_id = location.pathname.split('/')[2];

    const handleChange = ({ target }) => {
        let { name, value } = target;
        setFormState(prev => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

    }

    return ( 
        <div>
            <form onSubmit={(handleSubmit)}>
                <label>Account name
                    <input type="text" value={formData.name} onChange={handleChange} name='name'/>
                </label>
            </form>
        </div>
     );
}

export default CreateAccount;