import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import './index.css';
import { numberWithCommas, fetchRouteUrl } from '../../utils/formatters';

const StatsTable = ({ typeData, totalData, title, denominationType, regionName, regionOrArea }) => {
    const [searchText, setSearchText] = useState('');
    let history = useHistory();

    const navigateToArea = async(data, name) => {
        let regName = regionName || data.continent;
        if (regName === 'Australia/Oceania') {
            regName = 'Oceania';
        }
        const areaUrl = fetchRouteUrl(name, denominationType, regName, regionOrArea);
        history.push(areaUrl);
    }

    useEffect(() => {
        const applyFilters = () => {
            let filter = searchText.toUpperCase();
            let table = document.getElementById(title);
            let tr = table.getElementsByTagName("tr");
            for (let i = 0; i < tr.length; i++) {
                let td = tr[i].getElementsByTagName("td")[0];
                if (td) {
                  let txtValue = td.textContent || td.innerText;
                  if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    tr[i].style.display = "";
                  } else {
                    tr[i].style.display = "none";
                  }
                }
            }
        };
        applyFilters();
    }, [searchText, title])

    return (
        <>
            <div className="dataTable">
                <div className="top">
                    <h2 className="tableTitle">{title}</h2>
                    <input className="search" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="search here" />
                </div>
                <div className="dataTableScroll">
                    <table id={title}>
                        <tr>
                            <th>{denominationType}</th>
                            <th>Total Cases</th>
                            <th>Cases Today</th>
                            <th>Cases Per Million</th>
                            <th>Total Deaths</th>
                            <th>Deaths Today</th>
                            <th>Deaths Per Million</th>
                            <th>Activate Cases</th>
                            <th>Total Tests</th>
                            <th>Total Recovered</th>
                            <th>Total Critical</th>
                        </tr>
                        <tr>
                            <td className="flag__container">TOTAL</td>
                            <td className="caseRow">{numberWithCommas(totalData.cases)}</td>
                            <td className="caseRow">{numberWithCommas(totalData.todayCases)}</td>
                            <td className="caseRow">{numberWithCommas(totalData.casesPerOneMillion)}</td>
                            <td className="deathRow">{numberWithCommas(totalData.deaths)}</td>
                            <td className="deathRow">{numberWithCommas(totalData.todayDeaths)}</td>
                            <td className="deathRow">{numberWithCommas(totalData.deathsPerOneMillion)}</td>
                            <td className="activeRow">{numberWithCommas(totalData.active)}</td>
                            <td className="activeRow">{numberWithCommas(totalData.tests)}</td>
                            <td className="recoveredRow">{numberWithCommas(totalData.recovered)}</td>
                            <td className="criticalRow">{numberWithCommas(totalData.critical)}</td>
                        </tr>
                        {typeData && typeData.map((type, index) => {
                            return (
                                <React.Fragment key={index}>
                                    <tr className="navigateToArea" onClick={() => navigateToArea(type, type.name || type.state || type.province)}>
                                        <td className="flag__container">
                                            {type.countryInfo && type.countryInfo.flag && <img src={type.countryInfo.flag} className="flag" alt="hello"></img>}
                                            <h3 className="swag">{type.name || type.state || type.province}</h3>
                                        </td>
                                        <td className="caseRow">{type.cases || type.cases === 0 ? numberWithCommas(type.cases) : 'Unknown'}</td>
                                        <td className="caseRow">{type.todayCases || type.todayCases === 0  ? numberWithCommas(type.todayCases) : 'Unknown'}</td>
                                        <td className="caseRow">{type.casesPerOneMillion || type.casesPerOneMillion === 0  ? numberWithCommas(type.casesPerOneMillion) : 'Unknown'}</td>
                                        <td className="deathRow">{type.deaths || type.deaths === 0 ? numberWithCommas(type.deaths) : 'Unknown'}</td>
                                        <td className="deathRow">{type.todayDeaths || type.todayDeaths === 0  ? numberWithCommas(type.todayDeaths) : 'Unknown'}</td>
                                        <td className="deathRow">{type.deathsPerOneMillion || type.deathsPerOneMillion === 0  ? numberWithCommas(type.deathsPerOneMillion) : 'Unknown'}</td>
                                        <td className="activeRow">{type.active || type.active === 0  ? numberWithCommas(type.active) : 'Unknown'}</td>
                                        <td className="activeRow">{type.tests || type.tests === 0  ? numberWithCommas(type.tests) : 'Unknown'}</td>
                                        <td className="recoveredRow">{type.recovered || type.recovered === 0  ? numberWithCommas(type.recovered) : 'Unknown'}</td>
                                        <td className="criticalRow">{type.critical || type.critical === 0  ? numberWithCommas(type.critical) : 'Unknown'}</td>
                                    </tr>
                                </React.Fragment>
                            )
                        })}
                    </table>
                </div>
            </div>
        </>
    )
}

export default StatsTable;
