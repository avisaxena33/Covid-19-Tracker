import europeCountries from '../data/europeCountries';
import asiaCountries from '../data/asianCountries';
import oceaniaCountries from '../data/oceaniaCountries';
import africaCountries from '../data/africanCountries';
import southAmericaCountries from '../data/southAmericaCountries';

const all_countries_url = 'https://corona.lmao.ninja/v2/countries?yesterday&sort';
const global_url = 'https://corona.lmao.ninja/v2/all?yesterday';
const usa_states_url = 'https://corona.lmao.ninja/v2/states?sort&yesterday';
const usa_url = 'https://corona.lmao.ninja/v2/countries/USA?yesterday=true&strict=true&query';
const canada_url = 'https://corona.lmao.ninja/v2/countries/Canada?yesterday=true&strict=true&query';
const jhu_url = 'https://corona.lmao.ninja/v2/jhucsse';
const continent_url = 'https://corona.lmao.ninja/v2/continents/:query?yesterday&strict';
const multipleCountriesUrl = 'https://corona.lmao.ninja/v2/countries/:query?yesterday';

export const fetchAllCountriesData = async(setCountriesResponse) => {
    const response = await fetch(all_countries_url);
    const results = await response.json();
    results.forEach(country => {
        country['name'] = country['country']
    });
    setCountriesResponse(results);
}

export const fetchGlobalData = async(setGlobalResponse) => {
    const response = await fetch(global_url);
    const results = await response.json();
    setGlobalResponse(results);
}

export const fetchGlobalPageData = async(setTypeResponse, setTotalResponse) => {
    await Promise.all([fetchAllCountriesData(setTypeResponse), 
        fetchGlobalData(setTotalResponse)]);
}

export const fetchUsaStatesData = async(setUsaStatesResponse) => {
    const response = await fetch(usa_states_url);
    const results = await response.json();
    results.forEach(state => {
        state['name'] = state['state'];
    });
    setUsaStatesResponse(results);
}

export const fetchUsaData = async(setUsaResponse) => {
    const response = await fetch(usa_url);
    const results = await response.json();
    setUsaResponse(results);
}

export const fetchUsaPageData = async(setTypeResponse, setTotalResponse) => {
    await Promise.all([fetchUsaStatesData(setTypeResponse), fetchUsaData(setTotalResponse)]);
}

export const fetchCanadaData = async(setCanadaResponse) => {
    const response = await fetch(canada_url);
    const results = await response.json();
    setCanadaResponse(results);
}

export const fetchCanadaProvinceData = async(setCanadaProvincesResponse) => {
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
}

export const fetchCanadaPageData = async(setTypeResponse, setTotalResponse) => {
    await Promise.all([fetchCanadaProvinceData(setTypeResponse), 
        fetchCanadaData(setTotalResponse)]);
}

export const fetchEuropeResponse = async(setEuropeResponse) => {
    const url = continent_url.replace(':query', 'Europe');
    const response = await fetch(url);
    const results = await response.json();
    setEuropeResponse(results);
}

export const fetchEuropeCountriesResponse = async(setEuropeCountriesResponse) => {
    let queryString = europeCountries.map(country => {
        return country.code;
    }).join(',');
    const url = multipleCountriesUrl.replace(':query', queryString);
    const response = await fetch(url);
    const results = await response.json();
    results.forEach(country => {
        country['name'] = country['country'];
    });
    setEuropeCountriesResponse(results);
}

export const fetchEuropePageData = async(setTypeResponse, setTotalResponse) => {
    await Promise.all([fetchEuropeCountriesResponse(setTypeResponse), 
        fetchEuropeResponse(setTotalResponse)]);
}

export const fetchAsiaResponse = async(setAsiaResponse) => {
    const url = continent_url.replace(':query', 'Asia');
    const response = await fetch(url);
    const results = await response.json();
    setAsiaResponse(results);
}

export const fetchAsiaCountriesResponse = async(setAsiaCountriesResponse) => {
    let queryString = asiaCountries.map(country => {
        return (country.code || country.country);
    }).join(',');
    const url = multipleCountriesUrl.replace(':query', queryString);
    const response = await fetch(url);
    const results = await response.json();
    results.forEach(country => {
        country['name'] = country['country'];
    });
    setAsiaCountriesResponse(results);
}

export const fetchAsiaPageData = async(setTypeResponse, setTotalResponse) => {
    await Promise.all([fetchAsiaCountriesResponse(setTypeResponse), 
        fetchAsiaResponse(setTotalResponse)]);
}

export const fetchOceaniaResponse = async(setOceaniaResponse) => {
    const url = continent_url.replace(':query', 'Oceania');
    const response = await fetch(url);
    const results = await response.json();
    setOceaniaResponse(results);
}

export const fetchOceaniaCountriesResponse = async(setOceaniaCountriesResponse) => {
    let queryString = oceaniaCountries.map(country => {
        return (country.code || country.country);
    }).join(',');
    const url = multipleCountriesUrl.replace(':query', queryString);
    const response = await fetch(url);
    const results = await response.json();
    results.forEach(country => {
        country['name'] = country['country'];
    });
    setOceaniaCountriesResponse(results);
}

export const fetchOceaniaPageData = async(setTypeResponse, setTotalResponse) => {
    await Promise.all([fetchOceaniaCountriesResponse(setTypeResponse), 
        fetchOceaniaResponse(setTotalResponse)]);
}

export const fetchAfricaResponse = async(setAfricaResponse) => {
    const url = continent_url.replace(':query', 'Africa');
    const response = await fetch(url);
    const results = await response.json();
    setAfricaResponse(results);
}

export const fetchAfricaCountriesResponse = async(setAfricaCountriesResponse) => {
    let queryString = africaCountries.map(country => {
        return (country.code || country.country);
    }).join(',');
    const url = multipleCountriesUrl.replace(':query', queryString);
    const response = await fetch(url);
    const results = await response.json();
    results.forEach(country => {
        country['name'] = country['country'];
    });
    setAfricaCountriesResponse(results);
}

export const fetchAfricaPageData = async(setTypeResponse, setTotalResponse) => {
    await Promise.all([fetchAfricaCountriesResponse(setTypeResponse), 
        fetchAfricaResponse(setTotalResponse)]);
}

export const fetchSouthAmericaResponse = async(setSouthAmericaResponse) => {
    const url = continent_url.replace(':query', 'South America');
    const response = await fetch(url);
    const results = await response.json();
    setSouthAmericaResponse(results);
}

export const fetchSouthAmericaCountriesResponse = async(setSouthAmericaCountriesResponse) => {
    let queryString = southAmericaCountries.map(country => {
        return (country.code || country.country);
    }).join(',');
    const url = multipleCountriesUrl.replace(':query', queryString);
    const response = await fetch(url);
    const results = await response.json();
    results.forEach(country => {
        country['name'] = country['country'];
    });
    setSouthAmericaCountriesResponse(results);
}

export const fetchSouthAmericaPageData = async(setTypeResponse, setTotalResponse) => {
    await Promise.all([fetchSouthAmericaCountriesResponse(setTypeResponse), 
        fetchSouthAmericaResponse(setTotalResponse)]);
}

export const fetchHomePageData = async(setCountriesResponse, setGlobalResponse, 
    setUsaResponse, setUsaStatesResponse, setCanadaResponse, setCanadaProvincesResponse, 
    setEuropeResponse, setEuropeCountriesResponse, setAsiaResponse, setAsiaCountriesResponse, 
    setOceaniaResponse, setOceaniaCountriesResponse, setAfricaResponse, 
    setAfricaCountriesResponse, setSouthAmericaResponse, setSouthAmericaCountriesResponse) => {
    await Promise.all([fetchGlobalPageData(setCountriesResponse, setGlobalResponse), 
        fetchUsaPageData(setUsaStatesResponse, setUsaResponse), 
        fetchCanadaPageData(setCanadaProvincesResponse, setCanadaResponse), 
        fetchEuropePageData(setEuropeCountriesResponse, setEuropeResponse), 
        fetchAsiaPageData(setAsiaCountriesResponse, setAsiaResponse), 
        fetchOceaniaPageData(setOceaniaCountriesResponse, setOceaniaResponse), 
        fetchAfricaPageData(setAfricaCountriesResponse, setAfricaResponse), 
        fetchSouthAmericaPageData(setSouthAmericaCountriesResponse, setSouthAmericaResponse)]);
}
