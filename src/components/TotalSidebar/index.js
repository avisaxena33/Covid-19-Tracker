import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom'
import './index.css'
import numberWithCommas from '../../utils/formatters';
import { fetchGlobalData } from '../../utils/fetchCovidData';

const TotalSidebar = () => {
    const [globalResponse, setGlobalResponse] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const currentDate = new Date().toLocaleString();
    const currentTimezone = new Date().toLocaleTimeString('en-us',{timeZoneName:'short'}).split(' ')[2];

    const fetchAllData = async() => {
        await Promise.all([fetchGlobalData(setGlobalResponse)]);
        await setIsLoading(false);
        liveUpdates();
    }

    const liveUpdates = async() => {
        await Promise.all([fetchGlobalData(setGlobalResponse)]);
        await liveUpdates();
    }

    useEffect(() => {
        fetchAllData();
    }, [])

    if (isLoading) {
        return (
            <>
                <div className="sidebar">
                    <h1>Loading ...</h1>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="sidebar">
                <h1>World Totals</h1>
                <h7>Updated as of: {currentDate} {currentTimezone}</h7>
                <h1 className="cases__color">Cases: {numberWithCommas(globalResponse.cases)}</h1>
                <h1 className="death__color">Deaths: {numberWithCommas(globalResponse.deaths)}</h1>
                <h1 className="active__color">Activate Cases: {numberWithCommas(globalResponse.active)}</h1>
                <h1 className="critical__color">Critical Cases: {numberWithCommas(globalResponse.critical)}</h1>
                <h1 className="recovered__color">Recovered: {numberWithCommas(globalResponse.recovered)}</h1>
                <h1 className="recovered__color">Tests: {numberWithCommas(globalResponse.tests)}</h1>
                {globalResponse.affectedCountries && <h1 className="death__color">Countries Affected: {numberWithCommas(globalResponse.affectedCountries)}</h1>}
            </div>
        </>
    )
}

export default TotalSidebar;
