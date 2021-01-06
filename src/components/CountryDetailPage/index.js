import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
import './index.css';
import StatsTable from '../StatsTable';
import TotalSidebar from '../TotalSidebar';
import { fetchUsaPageData, fetchCanadaPageData, fetchEuropePageData, fetchAsiaPageData, fetchOceaniaPageData, fetchAfricaResponse, fetchSouthAmericaPageData, fetchAfricaPageData } from '../../utils/fetchCovidData';


const CountryDetailPage = () => {
    const { type, countryName } = useParams();
    const title = countryName.concat(' ').concat('Statistics');

    const [typeResponse, setTypeResponse] = useState({});
    const [totalResponse, setTotalResponse] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchCorrectData = async(countryName) => {
        switch (countryName) {
            case 'USA':
                await fetchUsaPageData(setTypeResponse, setTotalResponse);
                break;
            case 'Canada':
                await fetchCanadaPageData(setTypeResponse, setTotalResponse);
                break;
            case 'Europe':
                await fetchEuropePageData(setTypeResponse, setTotalResponse);
                break;
            case 'Asia':
                await fetchAsiaPageData(setTypeResponse, setTotalResponse);
                break;
            case 'Oceania':
                await fetchOceaniaPageData(setTypeResponse, setTotalResponse);
                break;
            case 'Africa':
                await fetchAfricaPageData(setTypeResponse, setTotalResponse);
                break;
            case 'South America':
                await fetchSouthAmericaPageData(setTypeResponse, setTotalResponse);
                break;
        }
    }

    const fetchAllData = async() => {
        await fetchCorrectData(countryName);            
        await setIsLoading(false);
    }

    useEffect(() => {
        fetchAllData();
    }, [countryName])

    if (isLoading) {
        return (
            <>
                <div className="loading">
                    <h1>Loading ...</h1>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="countryDetailPage">
                <div className="leftSidebar">
                    <TotalSidebar />
                </div>
                <div className="data__tables">
                    <StatsTable typeData={typeResponse} totalData={totalResponse} title={title} type={type} />
                </div>
            </div>
        </>
    )
};

export default CountryDetailPage;
