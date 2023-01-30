import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";


function UserPage() {
    const [current, setCurrent] = useState(null);
    const [transactions, setTransactions] = useState([]);

    let user_id = useParams();
    user_id = user_id.user_id;
    useEffect(() => {
        getBalance();
        getTransactions();
    }, []);

    const getBalance = async () => {
        const res = await fetch(`http://localhost:8000/accounts/${user_id}`);
        const data = await res.json();
        setCurrent(data[0].balance);
    }

    const getTransactions = async () => {
        const res = await fetch(`http://localhost:8000/transactions/${user_id}`);
        const data = await res.json();
        for (let key of data) {
            const response1 = await fetch(`http://localhost:8000/customers/${key.sender_account_id}`);
            const ans1 = await response1.json();
            key.sender_account_id = `${ans1[0].first_name} ${ans1[0].last_name}`;
            const response2 = await fetch(`http://localhost:8000/customers/${key.reciever_account_id}`);
            const ans2 = await response2.json();
            key.reciever_account_id = `${ans2[0].first_name} ${ans2[0].last_name}`;
            key.date = new Date(key.date).toLocaleDateString();
            setTransactions(prev => [...prev, key]);
        }
    }

    const filterTransactions = async (e) => {
        console.log(e.target.value);
        let newTransactions = [];
        switch (e.target.value) {
            case 'high to low':
                newTransactions = transactions.sort((a, b) => b.amount - a.amount);
                setTransactions([...newTransactions]);
                break;
            case 'low to high':
                newTransactions = transactions.sort((a, b) => a.amount - b.amount);
                setTransactions([...newTransactions]);
                break;
            case 'yours sender first':
                newTransactions = transactions.sort((a, b) => a.amount - b.amount);
                setTransactions([...newTransactions]);
                break;
            case 'yours recevier first':
                newTransactions = transactions.sort((a, b) => a.amount - b.amount);
                setTransactions([...newTransactions]);
                break;
            default:
                break;
        }
    }

    return (
        <div className="UserPage">
            <h1>Your Current:</h1>
            <h2>{current}</h2>
            <h1>Your Transactions:</h1>
            <select onChange={filterTransactions}>
                <option value={null}>select</option>
                <option value={'high to low'}>high to low</option>
                <option value={'low to high'}>low to high</option>
                <option value={'yours sender first'}>yours sender first</option>
                <option value={'yours recevier first'}>yours recevier first</option>
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
                {transactions.map((transaction) =>
                    <tbody key={transaction.transaction_id}>
                        <tr>
                            <td>{transaction.sender_account_id}</td>
                            <td>{transaction.reciever_account_id}</td>
                            <td>{transaction.credit_id === null ? 'transfer' : transaction.credit_id}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.status}</td>
                        </tr>
                    </tbody>
                )}
            </table>
        </div>
    )
}

export default UserPage;