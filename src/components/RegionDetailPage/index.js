import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import '../Home/index.css';
import StatsTable from '../StatsTable';
import TotalSidebar from '../TotalSidebar';
import HistoricalChart from '../HistoricalChart';
import MainLoading from "../MainLoading";
import Navbar from "../Navbar";
import { 
    fetchUsaPageData, 
    fetchCanadaPageData,
    fetchContinentPageData
} from '../../utils/mainApi';
import { 
    fetchCountryPageData, 
    fetchCanadaProvincePageData, 
    fetchUsaStatePageData 
} from '../../utils/mainApi';

const RegionDetailPage = () => {
    const { regionOrArea, type, isoCode, name } = useParams();
    const title = name.concat(' ').concat('Statistics');

    const [denominationType, setDenominationType] = useState('');
    const [typeResponse, setTypeResponse] = useState([]);
    const [totalResponse, setTotalResponse] = useState({});
    const [historicalResponse, setHistoricalResponse] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchCorrectData = async() => {
        if (regionOrArea === 'Region') {
            switch (name) {
                case 'United States':
                    setDenominationType('State');
                    await fetchUsaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                    break;
                case 'Canada':
                    setDenominationType('Province');
                    await fetchCanadaPageData(setTypeResponse, setTotalResponse, setHistoricalResponse);
                    break;
                case 'North America':
                case 'Europe':
                case 'Asia':
                case 'Oceania':
                case 'Africa':
                case 'South America':
                    setDenominationType('Country');
                    await fetchContinentPageData(name, setTypeResponse, setTotalResponse, setHistoricalResponse);
                    break;
                default:
                    break;
            }
        } else {
            switch (type) {
                case 'Country':
                    await fetchCountryPageData(isoCode, setTotalResponse, setHistoricalResponse);
                    break;
                case 'Province':
                    await fetchCanadaProvincePageData(name, setTotalResponse, setHistoricalResponse);
                    break;
                case 'State':
                    await fetchUsaStatePageData(name, setTotalResponse, setHistoricalResponse);
                    break;
                default:
                    break;
            }
        }
    }

    useEffect(() => {
        const resetState = () => {
            setDenominationType('');
            setTypeResponse([]);
            setTotalResponse({});
            setIsLoading(true);
        }
        const fetchAllData = async() => {
            try {
                await fetchCorrectData();
                setIsError(false);
                setErrorMessage('');            
                setIsLoading(false);
            } catch (error) {
                setIsError(true);
                setErrorMessage(error);
            }
        }
        resetState();
        fetchAllData();
    }, [name, regionOrArea, type, isoCode]);

    if (isLoading) {
        return (
            <>
                <MainLoading message='Loading ...' />
            </>
        )
    } else if (isError) {
        return (
            <>
                <MainLoading message='Error retrieving data, please refresh the home page ...'/>
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
                    <div className="dataTables">
                        <StatsTable typeData={typeResponse} totalData={totalResponse} title={title} denominationType={denominationType} regionOrArea = 'Area' />
                        <HistoricalChart data={historicalResponse} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default RegionDetailPage;
