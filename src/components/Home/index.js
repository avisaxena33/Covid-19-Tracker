import React, { useState, useEffect } from 'react';
import './index.css';
import StatsTable from '../StatsTable';
import TotalSidebar from '../TotalSidebar';
import { fetchHomePageData } from '../../utils/fetchCovidData';

const Home = () => {

    const [countriesResponse, setCountriesResponse] = useState([]);
    const [globalResponse, setGlobalResponse] = useState({});
    const [usaStatesResponse, setUsaStatesResponse] = useState({});
    const [usaResponse, setUsaResponse] = useState({});
    const [canadaResponse, setCanadaResponse] = useState({});
    const [canadaProvincesResponse, setCanadaProvincesResponse] = useState([]);
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

    const fetchAllData = async() => {
        await fetchHomePageData(setCountriesResponse, setGlobalResponse, setUsaResponse, 
            setUsaStatesResponse, setCanadaResponse, setCanadaProvincesResponse, 
            setEuropeResponse, setEuropeCountriesResponse, setAsiaResponse, 
            setAsiaCountriesResponse, setOceaniaResponse, setOceaniaCountriesResponse, 
            setAfricaResponse, setAfricaCountriesResponse, setSouthAmericaResponse, 
            setSouthAmericaCountriesResponse);
        await setIsLoading(false);
    }

    useEffect(() => {
        fetchAllData();
    }, [])

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
                <div className="leftSidebar">
                    <TotalSidebar />
                </div>
                <div className="data__tables">
                    <StatsTable typeData={countriesResponse} totalData={globalResponse} title='World Statistics' type='Country' />
                    <StatsTable typeData={usaStatesResponse} totalData={usaResponse} title='USA Statistics'  type='State' />
                    <StatsTable typeData={canadaProvincesResponse} totalData={canadaResponse} title='Canada Statistics' type='Province' />
                    <StatsTable typeData={europeCountriesResponse} totalData={europeResponse} title='Europe Statistics' type='Country' />
                    <StatsTable typeData={asiaCountriesResponse} totalData={asiaResponse} title='Asia Statistics' type='Country' />
                    <StatsTable typeData={oceaniaCountriesResponse} totalData={oceaniaResponse} title='Oceania Statistics' type='Country' />
                    <StatsTable typeData={africaCountriesResponse} totalData={africaResponse} title='Africa Statistics' type='Country' />
                    <StatsTable typeData={southAmericaCountriesResponse} totalData={southAmericaResponse} title='South America Statistics' type='Country' />
                </div>
            </div>
        </>
    )
}

export default Home
