import React, { useState, useEffect } from 'react';
import './index.css';
import numberWithCommas from '../../utils/formatters';

const StatsTable = ({ typeData, totalData, title, type }) => {
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        applyFilters();
    }, [searchText])

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

    return (
        <>
            <div className="country__table">
                <div className="top">
                    <h2>{title}</h2>
                    <input class="search" type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} placeholder="search here" />
                </div>
                <div className="country__table__scroll">
                    <table id={title}>
                        <tr>
                            <th>{type}</th>
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
                            <td className="cases__color">{numberWithCommas(totalData.cases)}</td>
                            <td className="cases__color">{numberWithCommas(totalData.todayCases)}</td>
                            <td className="cases__color">{numberWithCommas(totalData.casesPerOneMillion)}</td>
                            <td className="death__color">{numberWithCommas(totalData.deaths)}</td>
                            <td className="death__color">{numberWithCommas(totalData.todayDeaths)}</td>
                            <td className="death__color">{numberWithCommas(totalData.deathsPerOneMillion)}</td>
                            <td className="active__color">{numberWithCommas(totalData.active)}</td>
                            <td className="active__color">{numberWithCommas(totalData.tests)}</td>
                            <td className="recovered__color">{numberWithCommas(totalData.recovered)}</td>
                            <td className="critical__color">{numberWithCommas(totalData.critical)}</td>
                        </tr>
                        {typeData.map((type) => {
                            return (
                                <>
                                    <tr>
                                        <td className="flag__container">
                                            {type.countryInfo && type.countryInfo.flag && <img src={type.countryInfo.flag} className="flag"></img>}
                                            <h7 class="typeName">{type.name || type.state || type.province}</h7>
                                        </td>
                                        <td className="cases__color">{type.cases || type.cases == 0 ? numberWithCommas(type.cases) : 'Unknown'}</td>
                                        <td className="cases__color">{type.todayCases || type.todayCases == 0  ? numberWithCommas(type.todayCases) : 'Unknown'}</td>
                                        <td className="cases__color">{type.casesPerOneMillion || type.casesPerOneMillion == 0  ? numberWithCommas(type.casesPerOneMillion) : 'Unknown'}</td>
                                        <td className="death__color">{type.deaths || type.deaths == 0 ? numberWithCommas(type.deaths) : 'Unknown'}</td>
                                        <td className="death__color">{type.todayDeaths || type.todayDeaths == 0  ? numberWithCommas(type.todayDeaths) : 'Unknown'}</td>
                                        <td className="death__color">{type.deathsPerOneMillion || type.deathsPerOneMillion == 0  ? numberWithCommas(type.deathsPerOneMillion) : 'Unknown'}</td>
                                        <td className="active__color">{type.active || type.active == 0  ? numberWithCommas(type.active) : 'Unknown'}</td>
                                        <td className="active__color">{type.tests || type.tests == 0  ? numberWithCommas(type.tests) : 'Unknown'}</td>
                                        <td className="recovered__color">{type.recovered || type.recovered == 0  ? numberWithCommas(type.recovered) : 'Unknown'}</td>
                                        <td className="critical__color">{type.critical || type.critical == 0  ? numberWithCommas(type.critical) : 'Unknown'}</td>
                                    </tr>
                                </>
                            )
                        })}
                    </table>
                </div>
            </div>
        </>
    )
}

export default StatsTable;
