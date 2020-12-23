import React, { useState, useEffect } from 'react';
import './index.css';
import Card from '../Card'

const Home = () => {
    const curr_us_url = 'https://api.covidtracking.com/v1/us/current.json';
    const notIncludedDataPoints = ["date", "lastModified", "hash", "dateChecked"];

    const [response, setResponse] = useState([]);
    const [rawData, setRawData] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const fetchCurrentCountryData = async () => {
        const response = await fetch(curr_us_url);
        const results = await response.json();
        let arr_res = [];
        for (const [key, value] of Object.entries(results[0])) {
            if (!notIncludedDataPoints.includes(key)) {
                let newKey = key.charAt(0).toUpperCase() + key.slice(1);
                newKey = newKey.split(/(?=[A-Z])/).join(' ');
                arr_res.push({key:newKey, value})
            }
        }
        setResponse(arr_res)
        setRawData(results[0])
        setIsLoading(false)
    }

    const parseDate = () => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(rawData.dateChecked).toLocaleDateString([],options);
    }

    useEffect(() => {
        setIsLoading(true);
        fetchCurrentCountryData();
    }, [response])

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
                <h1>US Covid-19 Statistics As Of:</h1>
                <h1>{parseDate()}</h1>
                <div className="card-container">
                    {response.map((stat, index) => {
                        return (
                            <>
                                <Card key={index} data={stat} />
                            </>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Home
