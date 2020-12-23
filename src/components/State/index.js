import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from "react-router-dom";
import '../Home/index.css';
import Card from '../Card'
// list of every state + abbrev
import all_states from '../../all_states'

const State = () => {
    const { code } = useParams();
    const validCodes = all_states.map(state => state.abbreviation);
    let history = useHistory();

    if (!validCodes.includes(code)) {
        history.push('/')
    }

    const [response, setResponse] = useState([]);
    const [rawData, setRawData] = useState({})
    const [isLoading, setIsLoading] = useState(true);

    const getCurrentState = () => {
        const currState = all_states.filter((state) => {
            return state.abbreviation === code;
        });
        return currState[0] ? currState[0].name : 'Unknown'
    }

    const curr_state_url = `https://api.covidtracking.com/v1/states/${code.toLowerCase()}/current.json`;
    const notIncludedDataPoints = ["date", "lastModified", "hash", "dateChecked", "dateModified", "lastUpdateEt"];

    const fetchCurrentCountryData = async () => {
        const response = await fetch(curr_state_url);
        const results = await response.json();
        let arr_res = [];
        for (const [key, value] of Object.entries(results)) {
            if (!notIncludedDataPoints.includes(key)) {
                let newKey = key.charAt(0).toUpperCase() + key.slice(1);
                newKey = newKey.split(/(?=[A-Z])/).join(' ');
                arr_res.push({key:newKey, value})
            }
        }
        setResponse(arr_res)
        setRawData(results)
        setIsLoading(false)
    }

    const parseDate = () => {
        var options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(rawData.dateChecked).toLocaleDateString([],options);
    }

    useEffect(() => {
        setIsLoading(true);
        fetchCurrentCountryData();
    }, [code]);

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
            <h1>{getCurrentState()} Covid-19 Statistics As Of:</h1>
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

export default State
