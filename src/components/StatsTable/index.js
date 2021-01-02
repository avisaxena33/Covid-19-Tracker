import React, { useState, useEffect } from 'react';
import './index.css';

const StatsTable = ({ countriesData, globalData, title }) => {
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
    }

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
                            <th>Country</th>
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
                            <td className="cases__color">{globalData.cases}</td>
                            <td className="cases__color">{globalData.todayCases}</td>
                            <td className="cases__color">{globalData.casesPerOneMillion}</td>
                            <td className="death__color">{globalData.deaths}</td>
                            <td className="death__color">{globalData.todayDeaths}</td>
                            <td className="death__color">{globalData.deathsPerOneMillion}</td>
                            <td className="active__color">{globalData.active}</td>
                            <td className="active__color">{globalData.tests}</td>
                            <td className="recovered__color">{globalData.recovered}</td>
                            <td className="critical__color">{globalData.critical}</td>
                        </tr>
                        {countriesData.map((country) => {
                            return (
                                <>
                                    <tr>
                                        <td className="flag__container">
                                            {country.countryInfo && country.countryInfo.flag && <img src={country.countryInfo.flag} className="flag"></img>}
                                            {country.name}
                                        </td>
                                        <td className="cases__color">{country.cases || country.cases == 0 ? country.cases : 'Unknown'}</td>
                                        <td className="cases__color">{country.todayCases || country.todayCases == 0  ? country.todayCases : 'Unknown'}</td>
                                        <td className="cases__color">{country.casesPerOneMillion || country.casesPerOneMillion == 0  ? country.casesPerOneMillion : 'Unknown'}</td>
                                        <td className="death__color">{country.deaths || country.deaths == 0 ? country.deaths : 'Unknown'}</td>
                                        <td className="death__color">{country.todayDeaths || country.todayDeaths == 0  ? country.todayDeaths : 'Unknown'}</td>
                                        <td className="death__color">{country.deathsPerOneMillion || country.deathsPerOneMillion == 0  ? country.deathsPerOneMillion : 'Unknown'}</td>
                                        <td className="active__color">{country.active || country.active == 0  ? country.active : 'Unknown'}</td>
                                        <td className="active__color">{country.tests || country.tests == 0  ? country.tests : 'Unknown'}</td>
                                        <td className="recovered__color">{country.recovered || country.recovered == 0  ? country.recovered : 'Unknown'}</td>
                                        <td className="critical__color">{country.critical || country.critical == 0  ? country.critical : 'Unknown'}</td>
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
