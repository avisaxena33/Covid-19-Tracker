import europeCountries from '../data/europeCountries';
import asiaCountries from '../data/asianCountries';
import oceaniaCountries from '../data/oceaniaCountries';
import africaCountries from '../data/africanCountries';
import southAmericaCountries from '../data/southAmericaCountries';
import canadianProvinces from '../data/canadianProvinces';
import usaStates from '../data/usaStates';
import northAmericaCountries from '../data/northAmericaCountries';

/*
    Takes a number as input and returns a well formatted number string with commas
*/
export const numberWithCommas = (number) => {
    return (number || number === 0) ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'Unknown';
}

const fetchCanadaProvinceUrl = (name) => {
    let returnUrl = '';
    canadianProvinces.forEach((province) => {
        if (province.name === name) {
            returnUrl = `${province.code}/${province.name}`;
        }
    });
    return returnUrl;
}

const fetchUsaStateUrl = (name) => {
    let returnUrl = '';
    usaStates.forEach((state) => {
        if (state.name === name) {
            returnUrl = `${state.code}/${state.name}`; 
        }
    });
    return returnUrl;
}

const fetchCountryUrl = (regionName, name) => {
    let returnUrl = '';
    switch (regionName) {
        case 'North America':
            northAmericaCountries.forEach((country) => {
                if (country.name === name) {
                    returnUrl = `${country.alpha3Code}/${country.name}`;
                }
            });
            break;
        case 'Europe':
            europeCountries.forEach((country) => {
                if (country.name === name) {
                    returnUrl = `${country.alpha3Code}/${country.name}`;
                }
            });
            break;
        case 'Asia':
            asiaCountries.forEach((country) => {
                if (country.name === name) {
                    returnUrl = `${country.alpha3Code}/${country.name}`;
                }
            });
            break;
        case 'Oceania':
            console.log(name, regionName);
            oceaniaCountries.forEach((country) => {
                if (country.name === name) {
                    returnUrl = `${country.alpha3Code}/${country.name}`;
                }
            });
            break;
        case 'Africa':
            africaCountries.forEach((country) => {
                if (country.name === name) {
                    returnUrl = `${country.alpha3Code}/${country.name}`;
                }
            });
            break;
        case 'South America':
            southAmericaCountries.forEach((country) => {
                if (country.name === name) {
                    returnUrl = `${country.alpha3Code}/${country.name}`;
                }
            });
            break;
        default:
            break;
    }
    return returnUrl;
};

/*
    Returns the correct area detail page URL given an area name
*/
export const fetchRouteUrl = (name, denominationType, regionName, regionOrArea) => {
    const baseUrl= `/${regionOrArea}/${denominationType}`;
    let finalUrl = '';
    switch (denominationType) {
        case 'Country':
            finalUrl = `${baseUrl}/${fetchCountryUrl(regionName, name)}`;
            break;
        case 'Province':
            finalUrl = `${baseUrl}/${fetchCanadaProvinceUrl(name)}`;
            break;
        case 'State':
            finalUrl = `${baseUrl}/${fetchUsaStateUrl(name)}`;
            break;
        default:
            break;
    }
    return finalUrl;
}



