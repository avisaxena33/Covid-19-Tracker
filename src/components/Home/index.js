import React, { useState, useEffect } from 'react';
import './index.css';
import StatsTable from '../StatsTable';
import TotalSidebar from '../TotalSidebar';
import Navbar from "../Navbar";
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
            setIsLoading(false);
        } catch (error) {
            console.log(error);
        }
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
                <Navbar />
                <div className="mainBody">
                    <div className="leftSidebar">
                        <TotalSidebar />
                    </div>
                    <div className="data__tables">
                        <StatsTable typeData={countriesResponse} totalData={globalResponse} title='World Statistics' denominationType='Country' />
                        <StatsTable typeData={usaStatesResponse} totalData={usaResponse} title='United States Statistics'  denominationType='State' regionType='Country' regionIsoCode='USA' regionName='United States' />
                        <StatsTable typeData={canadaProvincesResponse} totalData={canadaResponse} title='Canada Statistics' denominationType='Province' regionType='Country' regionIsoCode='CAN' regionName='Canada' />
                        <StatsTable typeData={northAmericaCountriesResponse} totalData={northAmericaResponse} title='North America Statistics' denominationType='Country' regionType='Continent' regionIsoCode='North America' regionName='North America' />
                        <StatsTable typeData={europeCountriesResponse} totalData={europeResponse} title='Europe Statistics' denominationType='Country' regionType='Continent' regionIsoCode='Europe' regionName='Europe' />
                        <StatsTable typeData={asiaCountriesResponse} totalData={asiaResponse} title='Asia Statistics' denominationType='Country' regionType='Continent' regionIsoCode='Asia' regionName='Asia' />
                        <StatsTable typeData={oceaniaCountriesResponse} totalData={oceaniaResponse} title='Oceania Statistics' denominationType='Country' regionType='Continent' regionIsoCode='Oceania' regionName='Oceania' />
                        <StatsTable typeData={africaCountriesResponse} totalData={africaResponse} title='Africa Statistics' denominationType='Country' regionType='Continent' regionIsoCode='Africa' regionName='Africa' />
                        <StatsTable typeData={southAmericaCountriesResponse} totalData={southAmericaResponse} title='South America Statistics' denominationType='Country' regionType='Continent' regionIsoCode='South America' regionName='South America' />
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
