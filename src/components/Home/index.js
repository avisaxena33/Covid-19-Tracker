import React, { useState, useEffect } from 'react';
import './index.css';
import StatsTable from '../StatsTable';
import TotalSidebar from '../TotalSidebar';
import Navbar from "../Navbar";
import MainLoading from "../MainLoading";
import { fetchHomePageData } from '../../utils/mainApi';

const Home = () => {

    const [countriesResponse, setCountriesResponse] = useState([]);
    const [globalResponse, setGlobalResponse] = useState({});
    const [usaStatesResponse, setUsaStatesResponse] = useState({});
    const [usaResponse, setUsaResponse] = useState({});
    const [canadaResponse, setCanadaResponse] = useState({});
    const [canadaProvincesResponse, setCanadaProvincesResponse] = useState([]);
    const [northAmericaResponse, setNorthAmericaResponse] = useState({});
    const [northAmericaCountriesResponse, setNorthAmericaCountriesResponse] = useState([]);
    const [europeResponse, setEuropeResponse] = useState({});
    const [europeCountriesResponse, setEuropeCountriesResponse] = useState([]);
    const [asiaResponse, setAsiaResponse] = useState({});
    const [asiaCountriesResponse, setAsiaCountriesResponse] = useState([]);
    const [oceaniaResponse, setOceaniaResponse] = useState({});
    const [oceaniaCountriesResponse, setOceaniaCountriesResponse] = useState([]);
    const [africaResponse, setAfricaResponse] = useState({});
    const [africaCountriesResponse, setAfricaCountriesResponse] = useState([]);
    const [southAmericaResponse, setSouthAmericaResponse] = useState({});
    const [southAmericaCountriesResponse, setSouthAmericaCountriesResponse] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const fetchAllData = async() => {
        try {
            await fetchHomePageData(
                setCountriesResponse, setGlobalResponse, 
                setUsaResponse, setUsaStatesResponse, 
                setCanadaResponse, setCanadaProvincesResponse,
                setNorthAmericaResponse, setNorthAmericaCountriesResponse, 
                setEuropeResponse, setEuropeCountriesResponse, 
                setAsiaResponse, setAsiaCountriesResponse, 
                setOceaniaResponse, setOceaniaCountriesResponse, 
                setAfricaResponse, setAfricaCountriesResponse, 
                setSouthAmericaResponse, setSouthAmericaCountriesResponse);
            setIsError(false);
            setErrorMessage('');
            setIsLoading(false);
        } catch (error) {
            setIsError(true);
            setErrorMessage(error);
        }
    }

    useEffect(() => {
        fetchAllData();
    }, [])

    if (isLoading) {
        return (
            <>
                <MainLoading message='Loading ...'/>
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
                        <StatsTable typeData={countriesResponse} totalData={globalResponse} title='World Statistics' denominationType='Country' regionOrArea = 'Area' />
                        <StatsTable typeData={usaStatesResponse} totalData={usaResponse} title='United States Statistics'  denominationType='State' type='Country' isoCode='USA' name='United States' regionOrArea = 'Area' />
                        <StatsTable typeData={canadaProvincesResponse} totalData={canadaResponse} title='Canada Statistics' denominationType='Province' type='Country' isoCode='CAN' name='Canada' regionOrArea = 'Area' />
                        <StatsTable typeData={northAmericaCountriesResponse} totalData={northAmericaResponse} title='North America Statistics' denominationType='Country' type='Continent' isoCode='North America' name='North America' regionOrArea = 'Area' />
                        <StatsTable typeData={europeCountriesResponse} totalData={europeResponse} title='Europe Statistics' denominationType='Country' type='Continent' isoCode='Europe' name='Europe' regionOrArea = 'Area' />
                        <StatsTable typeData={asiaCountriesResponse} totalData={asiaResponse} title='Asia Statistics' denominationType='Country' type='Continent' isoCode='Asia' name='Asia' regionOrArea = 'Area' />
                        <StatsTable typeData={oceaniaCountriesResponse} totalData={oceaniaResponse} title='Oceania Statistics' denominationType='Country' type='Continent' isoCode='Oceania' name='Oceania' regionOrArea = 'Area' />
                        <StatsTable typeData={africaCountriesResponse} totalData={africaResponse} title='Africa Statistics' denominationType='Country' type='Continent' isoCode='Africa' name='Africa' regionOrArea = 'Area' />
                        <StatsTable typeData={southAmericaCountriesResponse} totalData={southAmericaResponse} title='South America Statistics' denominationType='Country' type='Continent' isoCode='South America' name='South America' regionOrArea = 'Area' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
