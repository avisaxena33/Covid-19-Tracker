import React from 'react';
import './index.css';

const MainLoading = ({ message }) => {
    return (
        <>
            <div className="mainLoading">
                <h1>{message}</h1>
            </div>
        </>
    )
}

export default MainLoading
