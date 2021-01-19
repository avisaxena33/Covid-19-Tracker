import React, { useState, useEffect } from 'react';
import './index.css'
import { numberWithCommas } from '../../utils/formatters';
import { fetchGlobalData } from '../../utils/fetchCovidData';

const TotalSidebar = () => {
    const [globalResponse, setGlobalResponse] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchAllData = async() => {
            await Promise.all([fetchGlobalData(setGlobalResponse)]);
            await setIsLoading(false);
            liveUpdates();
        }

        const liveUpdates = async() => {
            await Promise.all([fetchGlobalData(setGlobalResponse)]);
            await liveUpdates();
        }

        
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
                <div className="liveContainer">
                    <h1>World Totals</h1>
                    <div>
                        <h3>LIVE</h3> 
                    </div>
                </div>
                <h1 className="casesColor">{numberWithCommas(globalResponse.cases)}</h1>
                <h2>Cases</h2>
                <h1 className="deathColor">{numberWithCommas(globalResponse.deaths)}</h1>
                <h2>Deaths</h2> 
                <h1 className="activeColor">{numberWithCommas(globalResponse.active)}</h1>
                <h2>Activate Cases</h2>
                <h1 className="criticalColor">{numberWithCommas(globalResponse.critical)}</h1>
                <h2>Critical Cases</h2>
                <h1 className="recoveredColor">{numberWithCommas(globalResponse.recovered)}</h1>
                <h2>Recovered</h2>
                <h1 className="activeColor">{numberWithCommas(globalResponse.tests)}</h1>
                <h2>Tests</h2>
                {globalResponse.affectedCountries && <h1 className="countriesAffectedColor">{numberWithCommas(globalResponse.affectedCountries)}</h1>}
                {globalResponse.affectedCountries && <h2>Countries Affected</h2>}
            </div>
        </>
    )
}

export default TotalSidebar;
