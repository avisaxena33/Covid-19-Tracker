import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import './index.css';
import StatsTable from '../StatsTable';
import TotalSidebar from '../TotalSidebar';
import HistoricalChart from '../HistoricalChart';
import Navbar from "../Navbar";
import { fetchCountryPageData, fetchCanadaProvincePageData, 
    fetchUsaStatePageData } from '../../utils/mainApi';

const AreaDetailPage = () => {
    const { areaType, areaIsoCode, areaName } = useParams();
    const title = areaName.concat(' ').concat('Statistics');

    const [totalResponse, setTotalResponse] = useState({});
    const [historicalResponse, setHistoricalResponse] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCorrectData = async() => {
        switch (areaType) {
            case 'Country':
                await fetchCountryPageData(areaIsoCode, setTotalResponse, setHistoricalResponse);
                break;
            case 'Province':
                await fetchCanadaProvincePageData(areaName, setTotalResponse, setHistoricalResponse);
                break;
            case 'State':
                await fetchUsaStatePageData(areaName, setTotalResponse, setHistoricalResponse);
                break;
            default:
                break;
        }
    }
        const fetchAllData = async() => {
            await fetchCorrectData();            
            setIsLoading(false);
        }
        fetchAllData();
    }, [areaName, areaIsoCode, areaType]);

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
                        <StatsTable totalData={totalResponse} title={title} />
                        <HistoricalChart data={historicalResponse} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default AreaDetailPage;
