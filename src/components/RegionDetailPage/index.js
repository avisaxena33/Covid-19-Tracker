import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './index.css';
import StatsTable from '../StatsTable';
import TotalSidebar from '../TotalSidebar';
import HistoricalChart from '../HistoricalChart';
import Navbar from "../Navbar";
import { fetchUsaPageData, fetchCanadaPageData, fetchEuropePageData, fetchAsiaPageData, 
    fetchOceaniaPageData, fetchSouthAmericaPageData, fetchAfricaPageData } from '../../utils/mainApi';

const RegionDetailPage = () => {
    const { regionType, regionIsoCode, regionName } = useParams();
    const title = regionName.concat(' ').concat('Statistics');

    const [denominationType, setDenominationType] = useState('');
    const [typeResponse, setTypeResponse] = useState({});
    const [totalResponse, setTotalResponse] = useState({});
    const [historicalResponse, setHistoricalResponse] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchCorrectData = async(regionName) => {
        switch (regionName) {
            case 'United States':
                setDenominationType('State');
                await fetchUsaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            case 'Canada':
                setDenominationType('Province');
                await fetchCanadaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            case 'Europe':
                setDenominationType('Country');
                await fetchEuropePageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            case 'Asia':
                setDenominationType('Country');
                await fetchAsiaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            case 'Oceania':
                setDenominationType('Country');
                await fetchOceaniaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            case 'Africa':
                setDenominationType('Country');
                await fetchAfricaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            case 'South America':
                setDenominationType('Country');
                await fetchSouthAmericaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        const fetchAllData = async() => {
            await fetchCorrectData(regionName);            
            setIsLoading(false);
        }
        fetchAllData();
    }, [regionName]);

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
                        <StatsTable typeData={typeResponse} totalData={totalResponse} title={title} denominationType={denominationType} />
                        <HistoricalChart data={historicalResponse} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default RegionDetailPage;
