import europeCountries from '../data/europeCountries';
import asiaCountries from '../data/asianCountries';
import oceaniaCountries from '../data/oceaniaCountries';
import africaCountries from '../data/africanCountries';
import southAmericaCountries from '../data/southAmericaCountries';
import canadianProvinces from '../data/canadianProvinces';
import usaStates from '../data/usaStates';

/*
    Takes a number as input and returns a well formatted number string with commas
*/
export const numberWithCommas = (number) => {
    return number ? number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : 'Unknown';
};

/*
    Returns the correct area detail page URL given an area name
*/
export const fetchAreaUrl = async(areaName, denominationType, regionName) => {
    const areaBaseUrl= `/Area/${denominationType}`;
    let finalAreaUrl = '';
    switch (regionName) {
        case 'United States':
            usaStates.forEach((state) => {
                if (state.name === areaName) {
                    finalAreaUrl = `${areaBaseUrl}/${state.code}/${state.name}`; 
                }
            });
            break;
        case 'Canada':
            canadianProvinces.forEach((province) => {
                if (province.name === areaName) {
                    finalAreaUrl = `${areaBaseUrl}/${province.code}/${province.name}`;
                }
            });
            break;
        case 'Europe':
            europeCountries.forEach((country) => {
                if (country.name === areaName) {
                    finalAreaUrl = `${areaBaseUrl}/${country.alpha3Code}/${country.name}`;
                }
            });
            break;
        case 'Asia':
            asiaCountries.forEach((country) => {
                if (country.name === areaName) {
                    finalAreaUrl = `${areaBaseUrl}/${country.alpha3Code}/${country.name}`;
                }
            });
            break;
        case 'Oceania':
            oceaniaCountries.forEach((country) => {
                if (country.name === areaName) {
                    finalAreaUrl = `${areaBaseUrl}/${country.alpha3Code}/${country.name}`;
                }
            });
            break;
        case 'Africa':
            africaCountries.forEach((country) => {
                if (country.name === areaName) {
                    finalAreaUrl = `${areaBaseUrl}/${country.alpha3Code}/${country.name}`;
                }
            });
            break;
        case 'South America':
            southAmericaCountries.forEach((country) => {
                if (country.name === areaName) {
                    finalAreaUrl = `${areaBaseUrl}/${country.alpha3Code}/${country.name}`;
                }
            });
            break;
        default:
            break;
    }
    return finalAreaUrl;
};



