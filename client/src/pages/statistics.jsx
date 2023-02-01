import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../canvasjs.react';
import '../styles/stats.css'
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Statistics() {
    const [customerState, setCustomerState] = useState({
        count: ''
    });
    const [accountState, setAccountState] = useState({
        count: ''
    });
    const [transactionState, setTransactionState] = useState({
        count: '',
        completed: '',
        notApproved: '',
        inProgress: ''
    });

    useEffect(() => {
        fetch(`http://localhost:8000/customers/aggregate/total`)
            .then(response => response.json())
            .then(data => {
                setCustomerState(prev => ({ ...prev, count: data[`COUNT(*)`] }));
            })
        fetch(`http://localhost:8000/accounts/aggregate/total`)
            .then(response => response.json())
            .then(data => {
                setAccountState(prev => ({ ...prev, count: data[`COUNT(*)`] }));
            })
        fetch(`http://localhost:8000/transactions/aggregate/total`)
            .then(response => response.json())
            .then(data => {
                setTransactionState(prev => ({ ...prev, count: data[`COUNT(*)`] }));
            })
        fetch(`http://localhost:8000/transactions`)
            .then(response => response.json())
            .then(data => {
                let completed = 0, notApproved = 0, inProgress = 0;
                data.forEach(transaction => {
                    switch (transaction.status) {
                        case 'Completed':
                            completed++;
                            break;
                        case 'Not Approved':
                            notApproved++;
                            break;
                        case 'In Progress':
                            inProgress++
                            break;
                    }
                })
                setTransactionState(prev => ({ ...prev, completed: completed, notApproved: notApproved, inProgress: inProgress }))
            })
    }, [])

    const countChart = {
        title: {
            text: ""
        },
        data: [
            {
                type: "column",
                dataPoints: [
                    { label: "Customers", y: customerState.count },
                    { label: "Bank Accounts", y: accountState.count },
                    { label: "Transactions", y: transactionState.count }
                ]
            }
        ],
        axisY: {
            minimum: 0
        }
    }

    const statusChart = {
        title: {
            text: "Transactions Status"
        },
        data: [
            {
                type: "column",
                dataPoints: [
                    { label: "Completed", y: transactionState.completed },
                    { label: "Not Approved", y: transactionState.notApproved },
                    { label: "In Progress", y: transactionState.inProgress }
                ]
            }
        ],
        axisY: {
            minimum: 0
        }
    }

    return (
        <>
            <h2 id='statsH2'>Bank Statistics</h2>
            <div className='statsContainer'>
                <div className='chart'>
                    <CanvasJSChart options={countChart} containerProps={{ width: '100%', height: '100%' }} />
                </div>
                <div className='chart'>
                    <CanvasJSChart options={statusChart} containerProps={{ width: '100%', height: '100%' }} />
                </div>
            </div>
        </>
    );
}


export default Statistics;