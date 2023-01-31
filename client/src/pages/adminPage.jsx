import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';


function AdminPage() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/transactions`)
        .then(response=>response.json())
        .then(data=>setTransactions(data))
    }, [])

    return (
        <div className='adminPage'>
            <h2>Transactions</h2>
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
                <tbody>
                    {transactions.map(transaction => {
                        <tr key={transaction.transaction_id}>
                            <td>{transaction.sender_account_id}</td>
                            <td>{transaction.reciever_account_id}</td>
                            <td>{transaction.credit_id === null ? 'transfer' : transaction.credit_id}</td>
                            <td>{transaction.amount}</td>
                            <td>{transaction.date}</td>
                            <td>{transaction.description}</td>
                            <td>{transaction.status}</td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default AdminPage;