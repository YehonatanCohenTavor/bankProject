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
import '../styles/UserPage.css'
import { AppContext } from '../App'

function UserPage () {
  const navigate = useNavigate()
  const location = useLocation()
  const user_Id = location.pathname.split('/')[2]
  const [accounts, setAccounts] = useState([])
  const [transactions, setTransactions] = useState([])
  const [debits, setDebits] = useState([])
  const [accountIndex, setAccountIndex] = useState(0)
  const { logIn, authorization } = useContext(AppContext)
  const [getData, setGetData] = useState(false)

  let user_id = useParams()
  user_id = user_id.user_id
  useEffect(() => {
    authorization(getAccounts)
  }, [])

  const getTransactions = async account => {
    console.log(
      `http://localhost:8000/transactions/${account.account_id}/limit`
    )
    const res = await fetch(
      `http://localhost:8000/transactions/${account.account_id}/limit`
    )
    const ans = await res.json()
    if (ans.length === 0) return alert('No transactions found')
    const response1 = await fetch(`http://localhost:8000/credits/${user_id}`)
    const ans1 = await response1.json()
    for (let key of ans) {
      const response2 = await fetch(
        `http://localhost:8000/customers/${key.sender_account_id}`
      )
      const ans2 = await response2.json()
      key.sender_full_name = `${ans2[0].first_name} ${ans2[0].last_name}`
      const response3 = await fetch(
        `http://localhost:8000/customers/${key.reciever_account_id}`
      )
      const ans3 = await response3.json()
      key.reciver_full_name = `${ans3[0].first_name} ${ans3[0].last_name}`
      key.date = new Date(key.date).toLocaleDateString()
      if (key.credit_id === null) {
        setTransactions(prev => [...prev, key])
      } else {
        for (let credit of ans1) {
          if (credit.credit_id === key.credit_id) {
            credit.credit_number = credit.credit_number.slice(-4)
            let debit = {
              debit_id: credit.credit_id,
              credit_num: credit.credit_number,
              reciver_full_name: key.reciver_full_name,
              amount: key.amount,
              date: key.date,
              status: key.status
            }
            setDebits(prev => [...prev, debit])
          }
        }
      }
    }
  }

  const getAccounts = async () => {
    const res = await fetch(`http://localhost:8000/accounts/${user_id}`)
    const data = await res.json()
    setAccounts(data)
    getTransactions(data[0])
    setGetData(true)
  }

  const changeAccounts = async (e) => {
    console.log(e.target.value);
    console.log(accountIndex);
    if (e.target.value === 'Select Account') return;
    if (+(e.target.value) !== accountIndex){
        setAccountIndex(e.target.value)
        getTransactions(accounts[+e.target.value])
    }
  }

  const filterTransactions = async e => {
    console.log(e.target.value)
    let newTransactions = []
    switch (e.target.value) {
      case 'transfer first':
        newTransactions = transactions.sort((a, b) => {
          if (a.credit_id === null) return -1
          if (b.credit_id !== null) return 1
        })
        setTransactions([...newTransactions])
        break
      case 'high to low':
        newTransactions = transactions.sort((a, b) => b.amount - a.amount)
        setTransactions([...newTransactions])
        break
      case 'low to high':
        newTransactions = transactions.sort((a, b) => a.amount - b.amount)
        setTransactions([...newTransactions])
        break
      case 'yours sender first':
        newTransactions = transactions.sort((a, b) => {
          if (a.sender_account_id === user_id) return -1
          if (b.sender_account_id === user_id) return 1
          return a.sender_account_id - b.sender_account_id
        })
        setTransactions([...newTransactions])
        break
      case 'yours recevier first':
        newTransactions = transactions.sort((a, b) => {
          if (a.reciever_account_id === user_id) return -1
          if (b.reciever_account_id === user_id) return 1
          return a.reciever_account_id - b.reciever_account_id
        })
        setTransactions([...newTransactions])
        break
      default:
        break
    }
  }

  const filterDebits = async e => {
    let newDebits = []
    switch (e.target.value) {
      case 'high to low':
        console.log(debits)
        newDebits = debits.sort((a, b) => b.amount - a.amount)
        console.log(newDebits)
        setDebits([...newDebits])
        break
      case 'low to high':
        console.log(debits)
        newDebits = debits.sort((a, b) => b.amount - a.amount)
        setDebits([...newDebits])
        console.log(newDebits)
        break
      default:
        break
    }
  }

  if (getData === false) {
    return (
      <>
        <Loading />
      </>
    )
  }

  return (
    <div className='UserPage'>
      <div className='current-container'>
        <h1>Your Checking:</h1>
        <h2>{accounts[accountIndex].balance}</h2>
      </div>
      <div className='transactions-container'>
        <h1>Your Transactions:</h1>
        <select onChange={changeAccounts}>
          <option value={null}>Select Account</option>
          {accounts.map((account, index) => (
            <option key={account.account_id} value={index}>
              {index}
            </option>
          ))}
        </select>
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
      <div className='credit-container'>
        <h1>Your Credit Debits:</h1>
        <select onChange={filterDebits}>
          <option value={null}>select</option>
          <option value={'high to low'}>high to low</option>
          <option value={'low to high'}>low to high</option>
        </select>
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
          {debits.map(debit => (
            <tbody key={debit.debit_id}>
              <tr>
                <td>{debit.credit_num}</td>
                <td>{debit.reciver_full_name}</td>
                <td>{debit.amount}</td>
                <td>{debit.date}</td>
                <td>{debit.status}</td>
              </tr>
            </tbody>
          ))}
        </table>
      </div>
    </div>
  )
}

export default UserPage
