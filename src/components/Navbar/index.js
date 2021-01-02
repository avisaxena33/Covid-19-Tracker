import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import './index.css'
// list of every state + abbrev
import all_states from '../../all_states'

const MainNavbar = () => {
    return (
        <>
            <div className="navbar">
                <div className="navbar__left">
                    <h3 className="navbar__option">Covid-19 Tracker</h3>
                    <Link to="/" className="navbar-title">
                        <h3 className="navbar__option">World</h3>
                    </Link>
                    <Link to="/usa" className="navbar-title">
                        <h3 className="navbar__option">USA</h3>
                    </Link>
                    <Link to="/about/covid" className="navbar-title">
                        <h3 className="navbar__option">Covid-19</h3>
                    </Link>
                    <Link to="/about/me" className="navbar-title">
                        <h3 className="navbar__option">About Me</h3>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default MainNavbar
