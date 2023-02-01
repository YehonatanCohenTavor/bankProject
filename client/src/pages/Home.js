import React, { useState, useContext } from 'react';
import { NavLink,Link } from 'react-router-dom';
import '../styles/Home.css';
import { AppContext } from '../App';
import Footer from './components/Footer';


function Home() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const { logIn,logOut, authorization,getCookies } = useContext(AppContext);
    const images = [
        '/machine.svg',
        '/phone.svg',
        '/pig.svg'
    ];
    const header = [
        "Check Out Our Checking",
        "Bank Online Stress Free",
        "Save More Money"

    ];
    const paragraphs = [
        "ATM rebates = No ATM scavenger hunts! Plus, no overdraft fees.",
        "Bank anywhere, anytime using online banking or our mobile banking app.",
        "Our High-Rate Savings account pays you 18x the bank national average."
    ];

    const handlePrevClick = () => {
        setCurrentIndex(currentIndex === 0 ? paragraphs.length - 1 : currentIndex - 1);
    };

    const handleNextClick = () => {
        setCurrentIndex(currentIndex === paragraphs.length - 1 ? 0 : currentIndex + 1);
    };

    return (
        <div className='HomePage'>
            <h1 className='header'>Hilma Bank</h1>
            <div className='buttonsForms'>
                <h3>Login or Register</h3>
                <NavLink  className='buttonLink' to='/login'>Login</NavLink>
                <NavLink to='/register' className='buttonLink'>Register</NavLink>
            </div>
            <div className='video-continer'>
                <video autoPlay={true} muted loop >
                    <source src="/home_page_video.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            </div>
            <section>
                <div className="slider">
                    <div className="slider-content">
                        <img src={images[currentIndex]} alt="" />
                        <h1>{header[currentIndex]}</h1>
                        <p>{paragraphs[currentIndex]}</p>
                    </div>
                    <div className="slider-arrow prev" onClick={handlePrevClick}>
                        <i className="fa fa-arrow-left" />
                    </div>
                    <div className="slider-arrow next" onClick={handleNextClick}>
                        <i className="fa fa-arrow-right" />
                    </div>
                </div>
            </section>
            <section className='info'>
                <p>When we talk about financial wellness, we’re talking about trading debt and worry for security and financial well-being. It’s about knowing where you stand and having a plan to get where you’re going. Less about skipping lattes, more about taking small steps that keep you moving in the right direction. Our lives include celebrations and bills to pay. We want to help you do both.</p>
                <div>
                    <ul>
                        <li><b>Tier One Rewards</b> qualification is applied to each billing cycle, based on meeting the Alliant High-Rate Checking qualifications listed below during the preceding calendar month. If you haven't yet opened a checking account, you can open one today in Alliant online banking.</li>
                        <li><b>Example:</b> A billing cycle beginning on September 13 will earn Tier One Rewards based on Alliant High-Rate Checking qualifications met during the calendar month of August. A billing cycle beginning on August 28 will earn Tier One Rewards based on Alliant High-Rate Checking qualifications met during the calendar month of July</li>
                        <li><b>New cardholders</b> will automatically earn Tier One rewards for the first 100 days after card approval.</li>
                    </ul>
                </div>
                <p>Alliant Car Buying Service: Save 0.50% off your auto loan rate
                    Get upfront pricing, guaranteed savings and a discounted rate on your online car loan when you use the Alliant Car Buying Service powered by TrueCar. Members save an average of $2,019 off MSRP.1 </p>
                <br />
                <br />

                <table >
                    <caption><h2>New and used car auto loan rates</h2></caption>
                    <tbody>
                        <tr>
                            <td>
                                New Vehicle Rate
                            </td>
                            <td>
                                5.40 % APR
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Used Vehicle Rate
                            </td>
                            <td>
                                5.77 % APR
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Vehicle Refinance
                            </td>
                            <td>
                                5.77 % APR
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Used Vehicle Rate 10-15 years
                            </td>
                            <td>
                                8.77 % APR
                            </td>
                        </tr>
                    </tbody>

                </table>
            </section>
            <br />
            <br />
            <br />
            {/* <footer>
                <ul>
                    <li>
                        <a>Privacy and Security</a>
                    </li>
                    <li>
                        <a>Terms and Conditions</a>
                    </li>
                    <li>
                        <a>Sitemap</a>
                    </li>
                    <li>
                        <a>Accessibility</a>
                    </li>
                </ul>
            </footer> */}
        </div>
    );
}

export default Home;