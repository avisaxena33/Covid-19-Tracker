import { 
    fetchGlobalHomePageData, 
    fetchUsaHomePageData, 
    fetchCanadaHomePageData,
    fetchContinentHomePageData 
} from '../utils/fetchCovidData';

import { 
    fetchUsaStatesData,
    fetchAllCanadaProvinceData,
    fetchContinentCountriesData, fetchContinentTotalData, fetchContinentHistoricalData
} from '../utils/fetchCovidData';

import { 
    fetchCountryCumulativeData, fetchCountryHistoricalData,
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
            fetchUsaHomePageData('USA', setUsaStatesResponse, setUsaResponse), 
            fetchCanadaHomePageData('CAN', setCanadaProvincesResponse, setCanadaResponse), 
            fetchContinentHomePageData('North America', setNorthAmericaCountriesResponse, setNorthAmericaResponse),
            fetchContinentHomePageData('Europe', setEuropeCountriesResponse, setEuropeResponse), 
            fetchContinentHomePageData('Asia', setAsiaCountriesResponse, setAsiaResponse), 
            fetchContinentHomePageData('Oceania', setOceaniaCountriesResponse, setOceaniaResponse), 
            fetchContinentHomePageData('Africa', setAfricaCountriesResponse, setAfricaResponse), 
            fetchContinentHomePageData('South America', setSouthAmericaCountriesResponse, setSouthAmericaResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

/*
    Calls a bunch of fetches to grab all the data needed to render the USA page and sets all the according states.
*/
export const fetchUsaPageData = async(setTypeResponse, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchUsaStatesData(setTypeResponse), fetchCountryCumulativeData('USA', setTotalResponse), fetchCountryHistoricalData('USA', setHistoricalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

/*
    Calls a bunch of fetches to grab all the data needed to render the Canada page and sets all the according states.
*/
export const fetchCanadaPageData = async(setTypeResponse, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchAllCanadaProvinceData(setTypeResponse), fetchCountryCumulativeData('CAN', setTotalResponse), fetchCountryHistoricalData('CAN', setHistoricalResponse)]);
    } catch (error) {
        throw new Error(error);
    }
}

/*
    Calls a bunch of fetches to grab all the data needed to render a continent's page and sets all the according states.
*/
export const fetchContinentPageData = async(continent, setTypeResponse, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([
            fetchContinentCountriesData(continent, setTypeResponse), 
            fetchContinentTotalData(continent, setTotalResponse), 
            fetchContinentHistoricalData(continent, setHistoricalResponse)
        ]);
    } catch (error) {
        throw new Error(error);
    }
}

/*
    Calls a bunch of fetches to grab all the data needed to render a country's page and sets all the according states.
*/
export const fetchCountryPageData = async(areaIsoCode, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchCountryCumulativeData(areaIsoCode, setTotalResponse), fetchCountryHistoricalData(areaIsoCode, setHistoricalResponse)]); 
    } catch (error) {
        throw new Error(error);
    }
 }

 /*
    Fetches page data for Canada
*/
export const fetchCanadaProvincePageData = async(areaName, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchCanadaProvinceData(areaName, setTotalResponse), fetchCanadaProvinceHistoricalData(areaName, setHistoricalResponse)]); 
    } catch (error) {
        throw new Error(error);
    }
 }

 /*
    Fetches page data for a specific USA State
*/
export const fetchUsaStatePageData = async(areaName, setTotalResponse, setHistoricalResponse) => {
    try {
        await Promise.all([fetchUsaStateData(areaName, setTotalResponse), fetchUsaStateHistoricalData(areaName, setHistoricalResponse)]); 
    } catch (error) {
        throw new Error(error);
    }
 }
 
