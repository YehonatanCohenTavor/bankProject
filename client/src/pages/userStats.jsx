import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from 'react-router-dom';
import CanvasJSReact from '../canvasjs.react';
import { AppContext } from '../App';
import '../styles/stats.css';
import Footer from './components/Footer';

var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;



function UserStats() {
    const [accounts, setAccounts] = useState([]);
    const [transactionsSum, setTransactionsSum] = useState([]);
    const { authorization } = useContext(AppContext);
    const location = useLocation()
    const user_id = location.pathname.split('/')[2];

    const fetchData = () => {
        fetch(`http://localhost:8000/accounts/${user_id}/accounts`)
            .then(response => response.json())
            .then(data => {
                let accountsData = data.map(account => {
                    return ({ label: account.name, y: account.balance })
                })
                setAccounts([...accountsData]);
            })
        fetch(`http://localhost:8000/transactions/${user_id}/sum`)
            .then(response => response.json())
            .then(data => {
                setTransactionsSum(data[0]);
            })
    }

    useEffect(() => {
        authorization(fetchData);
    }, [])

    const accountsBalance = {
        backgroundColor: '#D4F1F4',
        title: {
            text: "Accounts Balance"
        },
        data: [
            {
                type: "column",
                dataPoints: accounts
            }
        ],
        axisY: {
            title: 'Balance',
            minimum: 0
        },
        axisX: {
            title: 'Account Name'
        }
    }

    const transactionSum = {
        backgroundColor: '#D4F1F4',
        title: {
            text: "Income And Expenses"
        },
        data: [
            {
                type: "pie",
                dataPoints: [
                    { label: 'Income', y: transactionsSum.income },
                    { label: 'Expenses', y: transactionsSum.expenses }
                ]
            }
        ],
        axisY: {
            title: 'Sum',
            minimum: 0
        },
        axisX: {
            title: ''
        }
    }


    return (
        <div className='UserStats'>
            <h2 id='statsH2'>Your Statistics</h2>
            <div className='statsContainer'>
                <div className='chart'>
                    <CanvasJSChart options={accountsBalance} containerProps={{ width: '100%', height: '100%' }} />
                </div>
                <div className='chart'>
                    <CanvasJSChart options={transactionSum} containerProps={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </div>
    );
}

export default UserStats;