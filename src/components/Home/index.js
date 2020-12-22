import React, { useRef, useState, useEffect } from 'react';
import './index.css';
import { all_states } from "../../all_states.js";
import Card from 'react-bootstrap/Card';
import CardDeck from 'react-bootstrap/CardDeck';
import CardGroup from 'react-bootstrap/CardGroup';
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col"

const Home = () => {
    const curr_us_url = 'https://api.covidtracking.com/v1/us/current.json';

    const fetchCurrentCountryData = async () => {
        const response = await fetch(curr_us_url);
        const results = await response.json();
        let arr_res = [];
        for (const [key, value] of Object.entries(results[0])) {
            arr_res.push({key, value})
        }
        setResponse(arr_res)
    }

    const [response, setResponse] = useState([]);
    
    useEffect(() => {
        fetchCurrentCountryData();
    }, [])

    return (
        <>
            <h1>US Covid-19 Statistics</h1>
            <Container>
                <CardDeck style={{display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                {response.map((data) => {
                            return (
                                <Col className="container-fluid mt-4">
                                    <Card 
                                    key={data.key}
                                    bg='danger' 
                                    border="dark" 
                                    style={{ width: '18rem' }}
                                    className="mb-2"
                                    >
                                        <Card.Header>{data.key}</Card.Header>
                                        <Card.Body>
                                            <Card.Title>{data.value}</Card.Title>
                                        </Card.Body>
                                    </Card>
                                </Col>      
                            )
                })}
                </CardDeck>
            </Container>
        </>
    )
}

export default Home
