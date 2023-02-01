import React, { useState, useEffect, useContext } from 'react';
import { AppContext } from '../App';
import { useLocation } from 'react-router-dom';
import '../styles/creditCards.css';

function CreditCards() {
    const [creditCards, setCreditCards] = useState([]);
    const location = useLocation();
    const user_id = location.pathname.split('/')[2];
    const { authorization } = useContext(AppContext);


    const fetchCards = () => {
        fetch(`http://localhost:8000/credits/${user_id}`)
            .then(response => response.json())
            .then(data => {
                setCreditCards(data);
            })
    }

    useEffect(() => {
        authorization(fetchCards);
    }, [])

    return (
        <div className='creditCardsContainer'>
            {creditCards.map(card => {
                let number = card.credit_number;
                return (<div key={card.credit_id} className='card'>
                    <div className='cardInfo'>
                        <p>Credit Card Number: {number.slice(-4) }</p>
                        <p>Expiration Date: {`${(new Date(card.expiration).getMonth()) + 1}/${new Date(card.expiration).getFullYear()}`}</p>
                        <p>Company: {card.company}</p>
                    </div>
                    <img className='creditCompanyImg' src={card.company==='Discover'?'/Discover.jpeg':`/${card.company}.png`} />
                </div>)
            })}
        </div>
    );
}

export default CreditCards;