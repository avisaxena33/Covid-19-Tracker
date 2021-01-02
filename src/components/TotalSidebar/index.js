import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import './index.css'

const TotalSidebar = ({ globalData }) => {
    return (
        <>
            <div className="sidebar">
                <h1>World Totals</h1>
                <h1 className="cases__color">Cases: {globalData.cases}</h1>
                <h1 className="death__color">Deaths: {globalData.deaths}</h1>
                <h1 className="active__color">Activate Cases: {globalData.active}</h1>
                <h1 className="critical__color">Critical Cases: {globalData.critical}</h1>
                <h1 className="recovered__color">Recovered: {globalData.recovered}</h1>
                <h1 className="recovered__color">Tests: {globalData.tests}</h1>
                <h1 className="death__color">Countries Affected: {globalData.affectedCountries}</h1>
            </div>
        </>
    )
}

export default TotalSidebar;
