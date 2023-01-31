import React, { useState, createContext, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate, useParams, useLocation } from "react-router-dom";


function UserPage() {
    const [current, setCurrent] = useState(null);
    const [transactions, setTransactions] = useState([]);
    const [debits, setDebits] = useState([]);

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
        const ans = await res.json();
        const response1 = await fetch(`http://localhost:8000/credits/${user_id}`);
        const ans1 = await response1.json();
        for (let key of ans) {
            const response2 = await fetch(`http://localhost:8000/customers/${key.sender_account_id}`);
            const ans2 = await response2.json();
            key.sender_full_name = `${ans2[0].first_name} ${ans2[0].last_name}`;
            const response3 = await fetch(`http://localhost:8000/customers/${key.reciever_account_id}`);
            const ans3 = await response3.json();
            key.reciver_full_name = `${ans3[0].first_name} ${ans3[0].last_name}`;
            key.date = new Date(key.date).toLocaleDateString();
            if (key.credit_id === null) {
                setTransactions(prev => [...prev, key]);
            } else {
                for (let credit of ans1) {
                    if (credit.credit_id === key.credit_id) {
                        credit.credit_number = credit.credit_number.slice(-4);
                        let debit = { debit_id: credit.credit_id, credit_num: credit.credit_number, reciver_full_name: key.reciver_full_name, amount: key.amount, date: key.date, status: key.status }
                        setDebits(prev => [...prev, debit]);
                    }
                }
            }
        }
    }


    const filterTransactions = async (e) => {
        console.log(e.target.value);
        let newTransactions = [];
        switch (e.target.value) {
            case 'transfer first':
                newTransactions = transactions.sort((a, b) => {
                    if (a.credit_id === null) return -1;
                    if (b.credit_id !== null) return 1;
                });
                setTransactions([...newTransactions]);
                break;
            case 'high to low':
                newTransactions = transactions.sort((a, b) => b.amount - a.amount);
                setTransactions([...newTransactions]);
                break;
            case 'low to high':
                newTransactions = transactions.sort((a, b) => a.amount - b.amount);
                setTransactions([...newTransactions]);
                break;
            case 'yours sender first':
                newTransactions = transactions.sort((a, b) => {
                    if (a.sender_account_id === user_id) return -1;
                    if (b.sender_account_id === user_id) return 1;
                    return a.sender_account_id - b.sender_account_id;
                });
                setTransactions([...newTransactions]);
                break;
            case 'yours recevier first':
                newTransactions = transactions.sort((a, b) => {
                    if (a.reciever_account_id === user_id) return -1;
                    if (b.reciever_account_id === user_id) return 1;
                    return a.reciever_account_id - b.reciever_account_id;
                });
                setTransactions([...newTransactions]);
                break;
            default:
                break;
        }
    }

    return (
        <div className="UserPage">
            <div className="current-container">
                <h1>Your Current:</h1>
                <h2>{current}</h2>
            </div>
            <div className="transactions-container">
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
                            <th>Sender name</th>
                            <th>Reciver name</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Description</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    {transactions.map((transaction) =>
                        <tbody key={transaction.transaction_id}>
                            <tr>
                                <td>{transaction.sender_full_name}</td>
                                <td>{transaction.reciver_full_name}</td>
                                <td>{transaction.amount}</td>
                                <td>{transaction.date}</td>
                                <td>{transaction.description}</td>
                                <td>{transaction.status}</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
            <div className="credit-container">
                <table>
                    <thead>
                        <tr>
                            <th>Credit number</th>
                            <th>Transfer to</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>status</th>
                        </tr>
                    </thead>
                    {debits.map((debit) =>
                        <tbody key={debit.debit_id}>
                            <tr>
                                <td>{debit.credit_num}</td>
                                <td>{debit.reciver_full_name}</td>
                                <td>{debit.amount}</td>
                                <td>{debit.date}</td>
                                <td>{debit.status}</td>
                            </tr>
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    )
}

export default UserPage;