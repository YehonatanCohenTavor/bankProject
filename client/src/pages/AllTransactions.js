import React, { useState, createContext, useEffect, useContext } from 'react'
import {
  Routes,
  Route,
  Navigate,
  useNavigate,
  useParams,
  useLocation
} from 'react-router-dom'
import Loading from './components/Loading'
import { AppContext } from '../App'
import '../styles/allTransactions.css';
import Footer from './components/Footer';


function AllTransactions() {
    const navigate = useNavigate()
    const location = useLocation()
    const user_id = location.pathname.split('/')[2]
    const [totalBalance , setTotalBalance] = useState(false)
    const [transactions, setTransactions] = useState([])
    const {authorization} = useContext(AppContext)

    const getAllTransations = async () =>{
        const res = await fetch(
            `http://localhost:8000/transactions/${user_id}/allTransactions`
          )
          const ans = await res.json()
          if (ans.length === 0) return alert('No transactions found')
          for (let key of ans) {
            const response2 = await fetch(
              `http://localhost:8000/customers/${key.sender_account_id}`
            )
            const ans2 = await response2.json()
            key.sender_full_name = `${ans2.first_name} ${ans2.last_name}`
            const response3 = await fetch(
              `http://localhost:8000/customers/${key.reciever_account_id}`
            )
            const ans3 = await response3.json()
            key.reciver_full_name = `${ans3.first_name} ${ans3.last_name}`
            key.date = new Date(key.date).toLocaleDateString()
            if (key.credit_id === null) {
                setTransactions(prev => [...prev, key])
            }
        }
    }

    useEffect(() => {
        authorization(getAllTransations);
        getTotalBalance();
      }, [])

      const getTotalBalance = async () => {
        const res = await fetch(`http://localhost:8000/accounts/${user_id}/totalBalance`);
        const data = await res.json()
        setTotalBalance(data.total);
      }

  return (
    <div className='AllTransactionPage'>
      <div className='current-container'>
        <br />
        <br />
        <br />

        <h1>Your Total Balance:</h1>
        <br />
        <h1>{totalBalance}</h1>
      </div>
      <div>
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
          {transactions.map(transaction => (
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
          ))}
        </table>
        </div>
    </div>
  )
}

export default AllTransactions