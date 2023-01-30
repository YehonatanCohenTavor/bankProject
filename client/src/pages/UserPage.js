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
        console.log(data[0]);
        setTransactions(prev => [...prev, data[0]]);
    }

    return (
        <div className="UserPage">
            <h1>Your Current:</h1>
            <h2>{current}</h2>
            <h1>Your Transactions:</h1>
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
                {transactions.map(transaction =>
                    <tr key={transaction.transaction_id}>
                        <td>{transaction.sender_account_id}</td>
                        <td>{transaction.reciever_account_id}</td>
                        <td>{transaction.credit_id}</td>
                        <td>{transaction.amount}</td>
                        <td>{transaction.date}</td>
                        <td>{transaction.description}</td>
                        <td>{transaction.status}</td>
                    </tr>
                )}
            </table>
        </div>
    )
}

export default UserPage;