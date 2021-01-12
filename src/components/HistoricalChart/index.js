import React, { useState, useEffect } from 'react';
import './index.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import numberWithCommas from '../../utils/formatters';

const HistoricalChart = ({ data }) => {

    const [chartData, setChartData] = useState([]);

    const formatData = () => {
        let tmpMap = {};
        for (const date of Object.keys(data.timeline.cases)) {
            tmpMap[date] = { date, 'cases': 0, 'deaths': 0, 'recovered': 0 };
        }
        for (const [date, cases] of Object.entries(data.timeline.cases)) {
            tmpMap[date]['cases'] = cases;
        }
        for (const [date, deaths] of Object.entries(data.timeline.deaths)) {
            tmpMap[date]['deaths'] = deaths;
        }
        for (const [date, recovered] of Object.entries(data.timeline.recovered)) {
            tmpMap[date]['recovered'] = recovered;
        }
        setChartData(Object.values(tmpMap));
    };

    useEffect (() => {
        formatData();
    }, [data]);

    //console.log(chartData);

    return (
        <>
            <div className="country__table">
                <LineChart
                    width={1000}
                    height={500}
                    data={chartData}
                    margin={{
                    top: 5, right: 50, left: 50, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="cases" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>                
            </div>
        </>
    )
}

export default HistoricalChart;
