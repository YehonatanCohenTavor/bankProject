import React, { useEffect, useState } from 'react';
import CanvasJSReact from '../canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function Statistics() {
    const [customerState, setCustomerState] = useState({
        count: ''
    });
    const [accountState, setAccountstate] = useState({
        count: ''
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
                setAccountstate(prev => ({ ...prev, count: data[`COUNT(*)`] }));
            })
    }, [])

    const options = {
        title: {
            text: "Customers And Bank Accounts"
        },
        data: [
            {
                type: "doughnut",
                dataPoints: [
                    { label: "Customers", y: customerState.count },
                    { label: "Bank Accounts", y: accountState.count },
                ]
            }
        ]
    }
    return (
        <div className='statsContainer'>
            <div>
                <CanvasJSChart options={options} containerProps={{ width: '35%', height: '200px' }} />
            </div>
        </div>
    );
}


export default Statistics;