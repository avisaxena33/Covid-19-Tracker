import React, { useState, useEffect } from 'react';
import './index.css';
import { ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend, AreaChart, Area, } from 'recharts';

const HistoricalChart = ({ data }) => {

    const [chartData, setChartData] = useState([]);
    const title = 'Cases/Deaths/Recovered';

    useEffect (() => {
        const formatData = () => {
            let tmpMap = {};
            if (data && data.timeline && (data.timeline.cases || data.timeline.deaths || data.timeline.recovered)) {
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
            }
            
        };
        formatData();
    }, [data]);

    const CustomTooltip = ({ active, payload, label }) => {

        return (
            <>
                <div className="custom-tooltip">
                    <p className="intro">{label}</p>
                    <div className="tooltipRow">
                        <div className="casesBox"></div>
                        {payload && payload[0] && <p>Cases: {payload[0].payload.cases}</p>}
                    </div>
                    <div className="tooltipRow">
                        <div className="deathsBox"></div>
                        {payload && payload[0] && <p>Deaths: {payload[0].payload.deaths}</p>}
                    </div>
                    <div className="tooltipRow">
                        <div className="recoveredBox"></div>
                        {payload && payload[0] && <p>Recovered: {payload[0].payload.recovered}</p>}
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="historicalChartContainer">
                <div className="historicalChartTitleContainer">
                    <h2 className="historicalChartTitle">{title}</h2>
                </div>
                <ResponsiveContainer width='99%' height={400}>
                    <AreaChart
                        data={chartData}
                        margin={{
                        top: 5, right: 50, left: 50, bottom: 5,
                        }}
                    >
                        <CartesianGrid strokeDasharray="3 3"  vertical={false} />
                        <XAxis dataKey="date" padding={{ left: 30, right: 30 }} angle={-45} textAnchor="end" height={60} tick={{fill: 'white'}} />
                        <YAxis tick={{fill: 'white'}} />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend verticalAlign="top" height={60} iconType='rect' iconSize={20} />
                        <Area type="monotone" dataKey="cases" stroke="lightseagreen" activeDot={{ r: 8 }} dot={false} strokeWidth={10} />
                        <Area type="monotone" dataKey="deaths" stroke="red" activeDot={{ r: 8 }} dot={false} strokeWidth={10} />
                        <Area type="monotone" dataKey="recovered" stroke=" #005AE7" activeDot={{ r: 8 }} dot={false} strokeWidth={10} />
                    </AreaChart>  
                </ResponsiveContainer>
            </div>
        </>
    )
}

export default HistoricalChart;
