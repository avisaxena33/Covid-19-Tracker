import { 
    fetchGlobalHomePageData, 
    fetchUsaHomePageData, 
    fetchCanadaHomePageData, 
    fetchNorthAmericaHomePageData,
    fetchEuropeHomePageData, 
    fetchAsiaHomePageData,
    fetchOceaniaHomePageData, 
    fetchAfricaHomePageData, 
    fetchSouthAmericaHomePageData, 
} from '../utils/fetchCovidData';

import { 
    fetchUsaData, fetchUsaStatesData, fetchUsaHistoricalData,
    fetchCanadaData, fetchAllCanadaProvinceData, fetchCanadaHistoricalData,
    fetchNorthAmericaData, fetchNorthAmericaCountriesData, fetchNorthAmericaHistoricalData, 
    fetchEuropeData, fetchEuropeCountriesData, fetchEuropeHistoricalData,
    fetchAsiaData, fetchAsiaCountriesData, fetchAsiaHistoricalData,
    fetchOceaniaData, fetchOceaniaCountriesData, fetchOceaniaHistoricalData,
    fetchAfricaData, fetchAfricaCountriesData, fetchAfricaHistoricalData,
    fetchSouthAmericaData, fetchSouthAmericaCountriesData, fetchSouthAmericaHistoricalData 
} from '../utils/fetchCovidData';

import { 
    fetchCountryData, fetchCountryHistoricalData,
    fetchCanadaProvinceData, fetchCanadaProvinceHistoricalData,
    fetchUsaStateData, fetchUsaStateHistoricalData 
} from '../utils/fetchCovidData';

/*
    Calls a bunch of fetches to grab all the data needed to render the home page and sets all the according states.
*/
export const fetchHomePageData = async(
    setCountriesResponse, setGlobalResponse, 
    setUsaResponse, setUsaStatesResponse, 
    setCanadaResponse, setCanadaProvincesResponse,
    setNorthAmericaResponse, setNorthAmericaCountriesResponse, 
    setEuropeResponse, setEuropeCountriesResponse, 
    setAsiaResponse, setAsiaCountriesResponse, 
    setOceaniaResponse, setOceaniaCountriesResponse, 
    setAfricaResponse, setAfricaCountriesResponse, 
    setSouthAmericaResponse, setSouthAmericaCountriesResponse) => {
    try {
        await Promise.allSettled([
            fetchGlobalHomePageData(setCountriesResponse, setGlobalResponse), 
            fetchUsaHomePageData(setUsaStatesResponse, setUsaResponse), 
            fetchCanadaHomePageData(setCanadaProvincesResponse, setCanadaResponse), 
            fetchNorthAmericaHomePageData(setNorthAmericaCountriesResponse, setNorthAmericaResponse),
            fetchEuropeHomePageData(setEuropeCountriesResponse, setEuropeResponse), 
            fetchAsiaHomePageData(setAsiaCountriesResponse, setAsiaResponse), 
            fetchOceaniaHomePageData(setOceaniaCountriesResponse, setOceaniaResponse), 
            fetchAfricaHomePageData(setAfricaCountriesResponse, setAfricaResponse), 
            fetchSouthAmericaHomePageData(setSouthAmericaCountriesResponse, setSouthAmericaResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

/*
    Calls a bunch of fetches to grab all the data needed to render the USA page and sets all the according states.
*/
export const fetchUsaPageData = async(setTypeResponse, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchUsaStatesData(setTypeResponse), fetchUsaData(setTotalResponse), fetchUsaHistoricalData(setHistoricalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

/*
    Calls a bunch of fetches to grab all the data needed to render the Canada page and sets all the according states.
*/
export const fetchCanadaPageData = async(setTypeResponse, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchAllCanadaProvinceData(setTypeResponse), fetchCanadaData(setTotalResponse), fetchCanadaHistoricalData(setHistoricalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

/*
    Calls a bunch of fetches to grab all the data needed to render the North America page and sets all the according states.
*/
export const fetchNorthAmericaPageData = async(setTypeResponse, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchNorthAmericaCountriesData(setTypeResponse), fetchNorthAmericaData(setTotalResponse), fetchNorthAmericaHistoricalData(setHistoricalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

/*
    Calls a bunch of fetches to grab all the data needed to render the Europe page and sets all the according states.
*/
export const fetchEuropePageData = async(setTypeResponse, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchEuropeCountriesData(setTypeResponse), fetchEuropeData(setTotalResponse), fetchEuropeHistoricalData(setHistoricalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

/*
    Calls a bunch of fetches to grab all the data needed to render the Asia page and sets all the according states.
*/
export const fetchAsiaPageData = async(setTypeResponse, setTotalResponse, setHistoricalResponse) => {
    try{
        await Promise.all([fetchAsiaCountriesData(setTypeResponse), fetchAsiaData(setTotalResponse), fetchAsiaHistoricalData(setHistoricalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

/*
    Calls a bunch of fetches to grab all the data needed to render the Oceania page and sets all the according states.
*/
export const fetchOceaniaPageData = async(setTypeResponse, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchOceaniaCountriesData(setTypeResponse), fetchOceaniaData(setTotalResponse), fetchOceaniaHistoricalData(setHistoricalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

/*
    Calls a bunch of fetches to grab all the data needed to render the Africa page and sets all the according states.
*/
export const fetchAfricaPageData = async(setTypeResponse, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchAfricaCountriesData(setTypeResponse), fetchAfricaData(setTotalResponse), fetchAfricaHistoricalData(setHistoricalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

/*
    Calls a bunch of fetches to grab all the data needed to render the South America page and sets all the according states.
*/
export const fetchSouthAmericaPageData = async(setTypeResponse, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchSouthAmericaCountriesData(setTypeResponse), fetchSouthAmericaData(setTotalResponse), fetchSouthAmericaHistoricalData(setHistoricalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

/*
    Fetches page data for a specific country
*/
export const fetchCountryPageData = async(areaIsoCode, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchCountryData(areaIsoCode, setTotalResponse), fetchCountryHistoricalData(areaIsoCode, setHistoricalResponse)]); 
    } catch (error) {
        throw new Error(error);
    }
 }

 /*
    Fetches page data for a specific country
*/
export const fetchCanadaProvincePageData = async(areaName, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchCanadaProvinceData(areaName, setTotalResponse), fetchCanadaProvinceHistoricalData(areaName, setHistoricalResponse)]); 
    } catch (error) {
        throw new Error(error);
    }
 }

 /*
    Fetches page data for a specific country
*/
export const fetchUsaStatePageData = async(areaName, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchUsaStateData(areaName, setTotalResponse), fetchUsaStateHistoricalData(areaName, setHistoricalResponse)]); 
    } catch (error) {
        throw new Error(error);
    }
 }
 
