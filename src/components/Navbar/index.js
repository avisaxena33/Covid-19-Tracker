import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import './index.css';
// list of every state + abbrev
import usaStates from '../../data/usaStates';

const MainNavbar = () => {
    return (
        <>
            <div className="navbar">
                    <Link to="/" className="navbar-title">
                        <h3 className="navbar__option">Covid-19 Tracker</h3>
                    </Link>
                    <Link to="/State/USA" className="navbar-title">
                        <h3 className="navbar__option">USA</h3>
                    </Link>
                    <Link to="/Country/Canada" className="navbar-title">
                        <h3 className="navbar__option">Canada</h3>
                    </Link>
                    <Link to="/Country/Asia" className="navbar-title">
                        <h3 className="navbar__option">Asia</h3>
                    </Link>
                    <Link to="/Country/Oceania" className="navbar-title">
                        <h3 className="navbar__option">Oceania</h3>
                    </Link>
                    <Link to="/Country/Africa" className="navbar-title">
                        <h3 className="navbar__option">Africa</h3>
                    </Link>
                    <Link to="/Country/South America" className="navbar-title">
                        <h3 className="navbar__option">South America</h3>
                    </Link>
                    {/* Commenting out for now -- in development
                    <Link to="/About/Covid" className="navbar-title">
                        <h3 className="navbar__option">Covid-19</h3>
                    </Link>
                    <Link to="/About/Me" className="navbar-title">
                        <h3 className="navbar__option">About Me</h3>
                    </Link>
                    */}
            </div>
        </>
    )
}

export default MainNavbar
