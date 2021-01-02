import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom'
import './index.css'
import numberWithCommas from '../../utils/formatters';

const TotalSidebar = ({ globalData }) => {
    return (
        <>
            <div className="sidebar">
                <h1>World Totals</h1>
                <h1 className="cases__color">Cases: {numberWithCommas(globalData.cases)}</h1>
                <h1 className="death__color">Deaths: {numberWithCommas(globalData.deaths)}</h1>
                <h1 className="active__color">Activate Cases: {numberWithCommas(globalData.active)}</h1>
                <h1 className="critical__color">Critical Cases: {numberWithCommas(globalData.critical)}</h1>
                <h1 className="recovered__color">Recovered: {numberWithCommas(globalData.recovered)}</h1>
                <h1 className="recovered__color">Tests: {numberWithCommas(globalData.tests)}</h1>
                <h1 className="death__color">Countries Affected: {numberWithCommas(globalData.affectedCountries)}</h1>
            </div>
        </>
    )
}

export default TotalSidebar;
