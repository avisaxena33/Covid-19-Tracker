import { matchContinentArray } from '../utils/formatters';

const all_countries_url = 'https://corona.lmao.ninja/v2/countries?yesterday&sort';
const global_url = 'https://corona.lmao.ninja/v2/all?yesterday';
const usa_states_url = 'https://corona.lmao.ninja/v2/states?sort&yesterday';
const usaStateUrl = 'https://corona.lmao.ninja/v2/states/:states?yesterday';
const jhu_url = 'https://corona.lmao.ninja/v2/jhucsse';
const continent_url = 'https://corona.lmao.ninja/v2/continents/:query?yesterday&strict';
const countriesCumulativeUrl = 'https://corona.lmao.ninja/v2/countries/:query?yesterday&strict=true&query';
const historicalDataCountryUrl = 'https://corona.lmao.ninja/v2/historical/:query?lastdays=all';
const historicalDataProvinceUrl = 'https://corona.lmao.ninja/v2/historical/:query/:province?lastdays=all';
const historicalDataUsaStateUrl = 'https://corona.lmao.ninja/v2/historical/usacounties/:state?lastdays=all';

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

export const fetchUsaHomePageData = async(countryIsoCode, setTypeResponse, setTotalResponse) => {
    try {
        await Promise.all([fetchUsaStatesData(setTypeResponse), fetchCountryCumulativeData(countryIsoCode, setTotalResponse)]);
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

export const fetchCanadaHomePageData = async(countryIsoCode, setTypeResponse, setTotalResponse) => {
    try {
        await Promise.all([fetchAllCanadaProvinceData(setTypeResponse), fetchCountryCumulativeData(countryIsoCode, setTotalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchContinentCountriesData = async(continent, setCountriesResponse) => {
    try {
        let continentArray = await matchContinentArray(continent);
        let queryString = continentArray.map(country => {
            return (country.alpha3Code || country.alpha2Code || country.name);
        }).join(',');
        const url = countriesCumulativeUrl.replace(':query', queryString);
        const response = await fetch(url);
        const results = await response.json();
        results.forEach(country => {
            country['name'] = country['country'];
        });
        setCountriesResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchContinentTotalData = async(continent, setContinentTotalResponse) => {
    try {
        const url = continent_url.replace(':query', continent);
        const response = await fetch(url);
        const results = await response.json();
        setContinentTotalResponse(results);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchContinentHistoricalData = async(continent, setContinentHistoricalResponse) => {
    try {
        let continentHistoricalResults = {
            'timeline': {
                'cases': {},
                'deaths': {},
                'recovered': {}
            }
        };
        let continentArray = await matchContinentArray(continent);
        const queryString = continentArray.map(country => {
            return (country.alpha3Code || country.alpha2Code || country.name);
        }).join(',');
        const url = historicalDataCountryUrl.replace(':query', queryString);
        const response = await fetch(url);
        const results = await response.json();
        results.forEach(country => {
            if (country.timeline) {
                for (const [dataDate, cases] of Object.entries(country.timeline.cases)) {
                    continentHistoricalResults.timeline.cases[dataDate] ? continentHistoricalResults.timeline.cases[dataDate] += cases : continentHistoricalResults.timeline.cases[dataDate] = cases;
                }
                for (const [dataDate, deaths] of Object.entries(country.timeline.deaths)) {
                    continentHistoricalResults.timeline.deaths[dataDate] ? continentHistoricalResults.timeline.deaths[dataDate] += deaths : continentHistoricalResults.timeline.deaths[dataDate] = deaths;
                }
                for (const [dataDate, recovered] of Object.entries(country.timeline.recovered)) {
                    continentHistoricalResults.timeline.recovered[dataDate] ? continentHistoricalResults.timeline.recovered[dataDate] += recovered : continentHistoricalResults.timeline.recovered[dataDate] = recovered;
                }
            }
        });
        setContinentHistoricalResponse(continentHistoricalResults);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchContinentHomePageData = async(continent, setTypeResponse, setTotalResponse) => {
    try {
        await Promise.all([fetchContinentCountriesData(continent, setTypeResponse), fetchContinentTotalData(continent, setTotalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

export const fetchCountryCumulativeData = async(countryIsoCode, setTotalResponse) => {
    try {
        const url = countriesCumulativeUrl.replace(':query', countryIsoCode);
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
