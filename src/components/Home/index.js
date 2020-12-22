import React, { useRef, useState, useEffect } from 'react';
import './index.css';
import { all_states } from "../../all_states.js";
import Card from 'react-bootstrap/Card';

const Home = () => {
    const curr_us_url = 'https://api.covidtracking.com/v1/us/current.json';

    const fetchCurrentCountryData = async () => {
        const response = await fetch(curr_us_url)
        const results = await response.json()
        setResponse(results[0])
    }

    const [response, setResponse] = useState({});
    
    useEffect(() => {
        fetchCurrentCountryData();
    }, [])

    console.log(response);
    return (
        <>
            <h1>US Covid-19 Statistics</h1>
            <Card 
            bg='danger' 
            border="dark" 
            style={{ width: '18rem' }}
            className="mb-2"
            >
                <Card.Header>Positive Cases</Card.Header>
                <Card.Body>
                    <Card.Title>{response ? response.positive : 0}</Card.Title>
                </Card.Body>
            </Card>
        </>
    )
}

export default Home
