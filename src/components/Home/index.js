import React, { useState, useEffect } from 'react';
import './index.css';
import StatsTable from '../StatsTable';
import TotalSidebar from '../TotalSidebar';

const Home = () => {
    const all_countries_url = 'https://corona.lmao.ninja/v2/countries?yesterday&sort';
    const global_url = 'https://corona.lmao.ninja/v2/all?yesterday';
    const usa_states_url = 'https://corona.lmao.ninja/v2/states?sort&yesterday';
    const usa_url = 'https://corona.lmao.ninja/v2/countries/USA?yesterday=true&strict=true&query';
    const canada_url = 'https://corona.lmao.ninja/v2/countries/Canada?yesterday=true&strict=true&query'
    const jhu_url = 'https://corona.lmao.ninja/v2/jhucsse';
    
    const [countriesResponse, setCountriesResponse] = useState([]);
    const [globalResponse, setGlobalResponse] = useState({});
    const [usaStatesResponse, setUsaStatesResponse] = useState({});
    const [usaResponse, setUsaResponse] = useState({});
    const [canadaResponse, setCanadaResponse] = useState({});
    const [canadaProvincesResponse, setCanadaProvincesResponse] = useState([]);

    const [isLoading, setIsLoading] = useState(true);

    const fetchAllData = async() => {
        await Promise.all([fetchAllCountriesData(), fetchGlobalData(), fetchUsaStatesData(), fetchUsaData(), fetchCanadaData(), fetchCanadaProvinceData()]);
        setIsLoading(false);
    }

    const fetchAllCountriesData = async() => {
        const response = await fetch(all_countries_url);
        const results = await response.json();
        results.forEach(country => {
            country['name'] = country['country']
        });
        setCountriesResponse(results);
    }

    const fetchGlobalData = async() => {
        const response = await fetch(global_url);
        const results = await response.json();
        setGlobalResponse(results);
    }

    const fetchUsaStatesData = async() => {
        const response = await fetch(usa_states_url);
        const results = await response.json();
        results.forEach(state => {
            state['name'] = state['state'];
        });
        setUsaStatesResponse(results);
    }

    const fetchUsaData = async() => {
        const response = await fetch(usa_url);
        const results = await response.json();
        setUsaResponse(results);
    }

    const fetchCanadaData = async() => {
        const response = await fetch(canada_url);
        const results = await response.json();
        setCanadaResponse(results);
    }

    const fetchCanadaProvinceData = async() => {
        const response = await fetch(jhu_url);
        const results = await response.json();
        let provinces = [];
        results.forEach(province => {
            if (province.country === 'Canada') {
                province['name'] = province['province'];
                province['cases'] = province['stats']['confirmed'];
                province['deaths'] = province['stats']['deaths'];
                province['recovered'] = province['stats']['recovered'];
                provinces.push(province);
            }
        });
        setCanadaProvincesResponse(provinces);
    }

    useEffect(() => {
        setIsLoading(true);
        fetchAllData();
    }, [])

    if (isLoading) {
        return (
            <>
                <div className="home">
                <h1>Loading ...</h1>
            </div>
            </>
        )
    }

    return (
        <>
            <div className="home">
                <TotalSidebar globalData={globalResponse} />
                <div className="data__tables">
                    <StatsTable countriesData={countriesResponse} globalData={globalResponse} title='World Statistics' />
                    <StatsTable countriesData={usaStatesResponse} globalData={usaResponse} title='USA Statistics' />
                    <StatsTable countriesData={canadaProvincesResponse} globalData={canadaResponse} title='Canada Statistics' />
                </div>
            </div>
        </>
    )
}

export default Home
