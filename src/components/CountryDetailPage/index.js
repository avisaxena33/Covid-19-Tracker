import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './index.css';
import StatsTable from '../StatsTable';
import TotalSidebar from '../TotalSidebar';
import HistoricalChart from '../HistoricalChart';
import Navbar from "../Navbar";
import { fetchUsaPageData, fetchCanadaPageData, fetchEuropePageData, fetchAsiaPageData, 
    fetchOceaniaPageData, fetchSouthAmericaPageData, fetchAfricaPageData } from '../../utils/mainApi';

const CountryDetailPage = () => {
    const { type, countryName } = useParams();
    const title = countryName.concat(' ').concat('Statistics');

    const [typeResponse, setTypeResponse] = useState({});
    const [totalResponse, setTotalResponse] = useState({});
    const [historicalResponse, setHistoricalResponse] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchCorrectData = async(countryName) => {
        switch (countryName) {
            case 'USA':
                await fetchUsaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            case 'Canada':
                await fetchCanadaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            case 'Europe':
                await fetchEuropePageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            case 'Asia':
                await fetchAsiaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            case 'Oceania':
                await fetchOceaniaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            case 'Africa':
                await fetchAfricaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            case 'South America':
                await fetchSouthAmericaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const fetchAllData = async() => {
            await fetchCorrectData(countryName);            
            await setIsLoading(false);
        }
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
            <div className="home">
                <Navbar />
                <div className="mainBody">
                    <div className="leftSidebar">
                        <TotalSidebar />
                    </div>
                    <div className="data__tables">
                        <StatsTable typeData={typeResponse} totalData={totalResponse} title={title} type={type} />
                        <HistoricalChart data={historicalResponse} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default CountryDetailPage;
