import europeCountries from '../data/europeCountries';
import asiaCountries from '../data/asianCountries';
import oceaniaCountries from '../data/oceaniaCountries';
import africaCountries from '../data/africanCountries';
import southAmericaCountries from '../data/southAmericaCountries';

const all_countries_url = 'https://corona.lmao.ninja/v2/countries?yesterday&sort';
const global_url = 'https://corona.lmao.ninja/v2/all?yesterday';
const usa_states_url = 'https://corona.lmao.ninja/v2/states?sort&yesterday';
const usa_url = 'https://corona.lmao.ninja/v2/countries/USA?yesterday=true&strict=true&query';
const usaStateUrl = 'https://corona.lmao.ninja/v2/states/:states?yesterday=true';
const canada_url = 'https://corona.lmao.ninja/v2/countries/Canada?yesterday=true&strict=true&query';
const jhu_url = 'https://corona.lmao.ninja/v2/jhucsse';
const continent_url = 'https://corona.lmao.ninja/v2/continents/:query?yesterday&strict';
const multipleCountriesUrl = 'https://corona.lmao.ninja/v2/countries/:query?yesterday';
const countryUrl = 'https://corona.lmao.ninja/v2/countries/:query?yesterday=true&strict=true&query';
const historicalDataCountryUrl = 'https://corona.lmao.ninja/v2/historical/:query?lastdays=all';
const historicalDataProvinceUrl = 'https://corona.lmao.ninja/v2/historical/:query/:province?lastdays';
const historicalDataUsaStateUrl = 'https://corona.lmao.ninja/v2/historical/usacounties/:state?lastdays=30';

export const fetchAllCountriesData = async(setCountriesResponse) => {
    try {
        const response = await fetch(all_countries_url);
        const results = await response.json();
        results.forEach(country => {
            country['name'] = country['country']
        });
        setCountriesResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchGlobalData = async(setGlobalResponse) => {
    try {
        const response = await fetch(global_url);
        const results = await response.json();
        setGlobalResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchGlobalHomePageData = async(setTypeResponse, setTotalResponse) => {
    try {
        await Promise.all([fetchAllCountriesData(setTypeResponse), fetchGlobalData(setTotalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchUsaStatesData = async(setUsaStatesResponse) => {
    try {
        const response = await fetch(usa_states_url);
        const results = await response.json();
        results.forEach(state => {
            state['name'] = state['state'];
        });
        setUsaStatesResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchUsaData = async(setUsaResponse) => {
    try {
        const response = await fetch(usa_url);
        const results = await response.json();
        setUsaResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchUsaHistoricalData = async(setUsaHistoricalResponse) => {
    try {
        const url = historicalDataCountryUrl.replace(':query', 'usa');
        const response = await fetch(url);
        const results = await response.json();
        setUsaHistoricalResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchUsaHomePageData = async(setTypeResponse, setTotalResponse) => {
    try {
        await Promise.all([fetchUsaStatesData(setTypeResponse), fetchUsaData(setTotalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchCanadaData = async(setCanadaResponse) => {
    try {
        const response = await fetch(canada_url);
        const results = await response.json();
        setCanadaResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchAllCanadaProvinceData = async(setCanadaProvincesResponse) => {
    try {
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
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchCanadaHistoricalData = async(setCanadaHistoricalResponse) => {
    try {
        const url = historicalDataCountryUrl.replace(':query', 'canada');
        const response = await fetch(url);
        const results = await response.json();
        setCanadaHistoricalResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchCanadaHomePageData = async(setTypeResponse, setTotalResponse) => {
    try {
        await Promise.all([fetchAllCanadaProvinceData(setTypeResponse), fetchCanadaData(setTotalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchEuropeData = async(setEuropeResponse) => {
    try {
        const url = continent_url.replace(':query', 'Europe');
        const response = await fetch(url);
        const results = await response.json();
        setEuropeResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchEuropeCountriesData = async(setEuropeCountriesResponse) => {
    try {
        let queryString = europeCountries.map(country => {
            return (country.alpha3Code || country.alpha2Code || country.name);
        }).join(',');
        const url = multipleCountriesUrl.replace(':query', queryString);
        const response = await fetch(url);
        const results = await response.json();
        results.forEach(country => {
            country['name'] = country['country'];
        });
        setEuropeCountriesResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchEuropeHistoricalData = async(setEuropeHistoricalResponse) => {
    try {
        let europeHistoricalResults = {
            'timeline': {
                'cases': {},
                'deaths': {},
                'recovered': {}
            }
        };
        const queryString = europeCountries.map(country => {
            return (country.alpha3Code || country.alpha2Code || country.name);
        }).join(',');
        const url = historicalDataCountryUrl.replace(':query', queryString);
        const response = await fetch(url);
        const results = await response.json();
        results.forEach(country => {
            if (country.timeline) {
                for (const [dataDate, cases] of Object.entries(country.timeline.cases)) {
                    europeHistoricalResults.timeline.cases[dataDate] ? europeHistoricalResults.timeline.cases[dataDate] += cases : europeHistoricalResults.timeline.cases[dataDate] = cases;
                }
                for (const [dataDate, deaths] of Object.entries(country.timeline.deaths)) {
                    europeHistoricalResults.timeline.deaths[dataDate] ? europeHistoricalResults.timeline.deaths[dataDate] += deaths : europeHistoricalResults.timeline.deaths[dataDate] = deaths;
                }
                for (const [dataDate, recovered] of Object.entries(country.timeline.recovered)) {
                    europeHistoricalResults.timeline.recovered[dataDate] ? europeHistoricalResults.timeline.recovered[dataDate] += recovered : europeHistoricalResults.timeline.recovered[dataDate] = recovered;
                }
            }
        });
        setEuropeHistoricalResponse(europeHistoricalResults);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchEuropeHomePageData = async(setTypeResponse, setTotalResponse) => {
    try {
        await Promise.all([fetchEuropeCountriesData(setTypeResponse), fetchEuropeData(setTotalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchAsiaData = async(setAsiaResponse) => {
    try {
        const url = continent_url.replace(':query', 'Asia');
        const response = await fetch(url);
        const results = await response.json();
        setAsiaResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchAsiaCountriesData = async(setAsiaCountriesResponse) => {
    try {
        let queryString = asiaCountries.map(country => {
            return (country.alpha3Code || country.alpha2Code || country.name);
        }).join(',');
        const url = multipleCountriesUrl.replace(':query', queryString);
        const response = await fetch(url);
        const results = await response.json();
        results.forEach(country => {
            country['name'] = country['country'];
        });
        setAsiaCountriesResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchAsiaHistoricalData = async(setAsiaHistoricalResponse) => {
    try {
        let asiaHistoricalResults = {
            'timeline': {
                'cases': {},
                'deaths': {},
                'recovered': {}
            }
        };
        const queryString = asiaCountries.map(country => {
            return (country.alpha3Code || country.alpha2Code || country.name);
        }).join(',');
        const url = historicalDataCountryUrl.replace(':query', queryString);
        const response = await fetch(url);
        const results = await response.json();
        results.forEach(country => {
            if (country.timeline) {
                for (const [dataDate, cases] of Object.entries(country.timeline.cases)) {
                    asiaHistoricalResults.timeline.cases[dataDate] ? asiaHistoricalResults.timeline.cases[dataDate] += cases : asiaHistoricalResults.timeline.cases[dataDate] = cases;
                }
                for (const [dataDate, deaths] of Object.entries(country.timeline.deaths)) {
                    asiaHistoricalResults.timeline.deaths[dataDate] ? asiaHistoricalResults.timeline.deaths[dataDate] += deaths : asiaHistoricalResults.timeline.deaths[dataDate] = deaths;
                }
                for (const [dataDate, recovered] of Object.entries(country.timeline.recovered)) {
                    asiaHistoricalResults.timeline.recovered[dataDate] ? asiaHistoricalResults.timeline.recovered[dataDate] += recovered : asiaHistoricalResults.timeline.recovered[dataDate] = recovered;
                }
            }
        });
        setAsiaHistoricalResponse(asiaHistoricalResults);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchAsiaHomePageData = async(setTypeResponse, setTotalResponse) => {
    try{
        await Promise.all([fetchAsiaCountriesData(setTypeResponse), fetchAsiaData(setTotalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchOceaniaData = async(setOceaniaResponse) => {
    try {
        const url = continent_url.replace(':query', 'Oceania');
        const response = await fetch(url);
        const results = await response.json();
        setOceaniaResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchOceaniaCountriesData = async(setOceaniaCountriesResponse) => {
    try {
        let queryString = oceaniaCountries.map(country => {
            return (country.alpha3Code || country.alpha2Code || country.name);
        }).join(',');
        const url = multipleCountriesUrl.replace(':query', queryString);
        const response = await fetch(url);
        const results = await response.json();
        results.forEach(country => {
            country['name'] = country['country'];
        });
        setOceaniaCountriesResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchOceaniaHistoricalData = async(setOceaniaHistoricalResponse) => {
    try {
        let oceaniaHistoricalResults = {
            'timeline': {
                'cases': {},
                'deaths': {},
                'recovered': {}
            }
        };
        const queryString = oceaniaCountries.map(country => {
            return (country.alpha3Code || country.alpha2Code || country.name);
        }).join(',');
        const url = historicalDataCountryUrl.replace(':query', queryString);
        const response = await fetch(url);
        const results = await response.json();
        results.forEach(country => {
            if (country.timeline) {
                for (const [dataDate, cases] of Object.entries(country.timeline.cases)) {
                    oceaniaHistoricalResults.timeline.cases[dataDate] ? oceaniaHistoricalResults.timeline.cases[dataDate] += cases : oceaniaHistoricalResults.timeline.cases[dataDate] = cases;
                }
                for (const [dataDate, deaths] of Object.entries(country.timeline.deaths)) {
                    oceaniaHistoricalResults.timeline.deaths[dataDate] ? oceaniaHistoricalResults.timeline.deaths[dataDate] += deaths : oceaniaHistoricalResults.timeline.deaths[dataDate] = deaths;
                }
                for (const [dataDate, recovered] of Object.entries(country.timeline.recovered)) {
                    oceaniaHistoricalResults.timeline.recovered[dataDate] ? oceaniaHistoricalResults.timeline.recovered[dataDate] += recovered : oceaniaHistoricalResults.timeline.recovered[dataDate] = recovered;
                }
            }
        });
        setOceaniaHistoricalResponse(oceaniaHistoricalResults);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchOceaniaHomePageData = async(setTypeResponse, setTotalResponse) => {
    try {
        await Promise.all([fetchOceaniaCountriesData(setTypeResponse), fetchOceaniaData(setTotalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchAfricaData = async(setAfricaResponse) => {
    try {
        const url = continent_url.replace(':query', 'Africa');
        const response = await fetch(url);
        const results = await response.json();
        setAfricaResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchAfricaCountriesData = async(setAfricaCountriesResponse) => {
    try {
        let queryString = africaCountries.map(country => {
            return (country.alpha3Code || country.alpha2Code || country.name);
        }).join(',');
        const url = multipleCountriesUrl.replace(':query', queryString);
        const response = await fetch(url);
        const results = await response.json();
        results.forEach(country => {
            country['name'] = country['country'];
        });
        setAfricaCountriesResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchAfricaHistoricalData = async(setAfricaHistoricalResponse) => {
    try {
        let africaHistoricalResults = {
            'timeline': {
                'cases': {},
                'deaths': {},
                'recovered': {}
            }
        };
        const queryString = africaCountries.map(country => {
            return (country.alpha3Code || country.alpha2Code || country.name);
        }).join(',');
        const url = historicalDataCountryUrl.replace(':query', queryString);
        const response = await fetch(url);
        const results = await response.json();
        results.forEach(country => {
            if (country.timeline) {
                for (const [dataDate, cases] of Object.entries(country.timeline.cases)) {
                    africaHistoricalResults.timeline.cases[dataDate] ? africaHistoricalResults.timeline.cases[dataDate] += cases : africaHistoricalResults.timeline.cases[dataDate] = cases;
                }
                for (const [dataDate, deaths] of Object.entries(country.timeline.deaths)) {
                    africaHistoricalResults.timeline.deaths[dataDate] ? africaHistoricalResults.timeline.deaths[dataDate] += deaths : africaHistoricalResults.timeline.deaths[dataDate] = deaths;
                }
                for (const [dataDate, recovered] of Object.entries(country.timeline.recovered)) {
                    africaHistoricalResults.timeline.recovered[dataDate] ? africaHistoricalResults.timeline.recovered[dataDate] += recovered : africaHistoricalResults.timeline.recovered[dataDate] = recovered;
                }
            }
        });
        setAfricaHistoricalResponse(africaHistoricalResults);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchAfricaHomePageData = async(setTypeResponse, setTotalResponse) => {
    try {
        await Promise.all([fetchAfricaCountriesData(setTypeResponse), fetchAfricaData(setTotalResponse)]);
    } catch (error) {
        throw new Error(error);
    } 
}

export const fetchSouthAmericaData = async(setSouthAmericaResponse) => {
    try {
        const url = continent_url.replace(':query', 'South America');
        const response = await fetch(url);
        const results = await response.json();
        setSouthAmericaResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchSouthAmericaCountriesData = async(setSouthAmericaCountriesResponse) => {
    try {
        let queryString = southAmericaCountries.map(country => {
            return (country.alpha3Code || country.alpha2Code || country.name);
        }).join(',');
        const url = multipleCountriesUrl.replace(':query', queryString);
        const response = await fetch(url);
        const results = await response.json();
        results.forEach(country => {
            country['name'] = country['country'];
        });
        setSouthAmericaCountriesResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchSouthAmericaHistoricalData = async(setSouthAmericaHistoricalResponse) => {
    try {
        let southAmericaHistoricalResults = {
            'timeline': {
                'cases': {},
                'deaths': {},
                'recovered': {}
            }
        };
        const queryString = southAmericaCountries.map(country => {
            return (country.alpha3Code || country.alpha2Code || country.name);
        }).join(',');
        const url = historicalDataCountryUrl.replace(':query', queryString);
        const response = await fetch(url);
        const results = await response.json();
        results.forEach(country => {
            if (country.timeline) {
                for (const [dataDate, cases] of Object.entries(country.timeline.cases)) {
                    southAmericaHistoricalResults.timeline.cases[dataDate] ? southAmericaHistoricalResults.timeline.cases[dataDate] += cases : southAmericaHistoricalResults.timeline.cases[dataDate] = cases;
                }
                for (const [dataDate, deaths] of Object.entries(country.timeline.deaths)) {
                    southAmericaHistoricalResults.timeline.deaths[dataDate] ? southAmericaHistoricalResults.timeline.deaths[dataDate] += deaths : southAmericaHistoricalResults.timeline.deaths[dataDate] = deaths;
                }
                for (const [dataDate, recovered] of Object.entries(country.timeline.recovered)) {
                    southAmericaHistoricalResults.timeline.recovered[dataDate] ? southAmericaHistoricalResults.timeline.recovered[dataDate] += recovered : southAmericaHistoricalResults.timeline.recovered[dataDate] = recovered;
                }
            }
        });
        setSouthAmericaHistoricalResponse(southAmericaHistoricalResults);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchSouthAmericaHomePageData = async(setTypeResponse, setTotalResponse) => {
    try {
        await Promise.all([fetchSouthAmericaCountriesData(setTypeResponse), fetchSouthAmericaData(setTotalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchCountryData = async(areaIsoCode, setTotalResponse) => {
    try {
        const url = countryUrl.replace(':query', areaIsoCode);
        const response = await fetch(url);
        const results = await response.json();
        results['name'] = results['country'];
        setTotalResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchCountryHistoricalData = async(areaIsoCode, setHistoricalResponse) => {
    try {
        const url = historicalDataCountryUrl.replace(':query', areaIsoCode);
        const response = await fetch(url);
        const results = await response.json();
        results['name'] = results['country'];
        setHistoricalResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchCanadaProvinceData = async(areaName, setTotalResponse) => {
    try {
        const response = await fetch(jhu_url);
        const results = await response.json();
        let prov = {};
        results.forEach(province => {
            if (province.country === 'Canada' && province.province === areaName) {
                province['name'] = province['province'];
                province['cases'] = province['stats']['confirmed'];
                province['deaths'] = province['stats']['deaths'];
                province['recovered'] = province['stats']['recovered'];
                prov = province;
            }
        });
        setTotalResponse(prov);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchCanadaProvinceHistoricalData = async(areaName, setHistoricalResponse) => {
    try {
        const tmpUrl = historicalDataProvinceUrl.replace(':query', 'CAN');
        const url = tmpUrl.replace(':province', areaName);
        const response = await fetch(url);
        const results = await response.json();
        results['name'] = results['province'];
        setHistoricalResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchUsaStateData = async(areaName, setTotalResponse) => {
    try {
        const url = usaStateUrl.replace(':states', areaName);
        const response = await fetch(url);
        const results = await response.json();
        results['name'] = results['state'];
        setTotalResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchUsaStateHistoricalData = async(areaName, setHistoricalResponse) => {
    try {
        areaName = areaName.toLowerCase();
        const url = historicalDataUsaStateUrl.replace(':state', areaName);
        const response = await fetch(url);
        const results = await response.json();
        let usaStateHistoricalResults = {
            'timeline': {
                'cases': {},
                'deaths': {},
                'recovered': {}
            }
        }; 
        results.forEach(county => {
            if (county.timeline) {
                for (const [dataDate, cases] of Object.entries(county.timeline.cases)) {
                    usaStateHistoricalResults.timeline.cases[dataDate] ? usaStateHistoricalResults.timeline.cases[dataDate] += cases : usaStateHistoricalResults.timeline.cases[dataDate] = cases;
                }
                for (const [dataDate, deaths] of Object.entries(county.timeline.deaths)) {
                    usaStateHistoricalResults.timeline.deaths[dataDate] ? usaStateHistoricalResults.timeline.deaths[dataDate] += deaths : usaStateHistoricalResults.timeline.deaths[dataDate] = deaths;
                }
            }
        });
        setHistoricalResponse(usaStateHistoricalResults);
    } catch (error) {
        throw new Error(error);
    }
}
