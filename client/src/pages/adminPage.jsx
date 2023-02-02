import React, { useContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { AppContext } from '../App';
import '../styles/adminPage.css';
import Footer from './components/Footer';


function AdminPage() {
    const [transactions, setTransactions] = useState([]);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    const [filter, setFilter] = useState('all');
    const location = useLocation();
    const user_id = location.pathname.split("/")[2];
    const {logOut} = useContext(AppContext)


    useEffect(() => {
        fetch(`http://localhost:8000/transactions`)
            .then(response => response.json())
            .then(data => {
                data.forEach(item => item.date = new Date(item.date).toLocaleDateString())
                setTransactions(data)
                setFilteredTransactions(data);
            })
    }, [])

    useEffect(() => {
        let sorted;
        switch (filter) {
            case 'all':
                setFilteredTransactions([...transactions]);
                break;
            case 'progress':
                sorted = transactions.filter(item => item.status === 'In Progress')
                setFilteredTransactions([...sorted]);
                break;
            case 'completed':
                sorted = transactions.filter(item => item.status === 'Completed')
                setFilteredTransactions([...sorted]);
                break;
            case 'not approved':
                sorted = transactions.filter(item => item.status === 'Not Approved')
                setFilteredTransactions([...sorted]);
                break;
        }
    }, [filter])

    const handleChange = ({ target }) => {
        setFilter(target.value);
    }

    const updateStatus = ({ target }) => {
        fetch(`http://localhost:8000/transactions/${target.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
        })
            .then(response => response.json())
            .then(data => {
                let updatedTransactions = transactions.map(transaction => {
                    if (transaction.transaction_id === data.transaction_id) transaction.status = 'Completed';
                    return transaction;
                })
                setTransactions([...updatedTransactions]);
            })
    }

    return (
        <div className='adminPage'>
            <div className='links'>
                <NavLink to={`/AdminPage/${user_id}/stats`}>Statistics</NavLink>
                <NavLink to='/Home'>Log out</NavLink> 
            </div>
            <h2>Transactions</h2>
            <select onChange={handleChange} value={filter}>
                <option value='all'>All</option>
                <option value='progress'> In progress</option>
                <option value='completed'>Completed</option>
                <option value='not approved'>Not approved</option>
            </select>
            <table>
                <thead>
                    <tr>
                        <th>sender_account_id</th>
                        <th>reciever_account_id</th>
                        <th>credit_id</th>
                        <th>amount</th>
                        <th>date</th>
                        <th>description</th>
                        <th>status</th>
                    </tr>
                </thead>
                {filteredTransactions.map(transaction => {
                    return (<tbody key={transaction.transaction_id}>
                        <tr>
                            <td>{transaction.sender_account_id}</td>
                            <td>{transaction.reciever_account_id}</td>
                            <td>{transaction.credit_id === null ? 'transfer' : transaction.credit_id}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.status}</td>
                            {transaction.status == 'In Progress' ? <td><button id={transaction.transaction_id} onClick={updateStatus}>Approve</button></td> : null}
                        </tr>
                    </tbody>)
                })}
            </table>  
        </div>
    );
}

export default AdminPage;