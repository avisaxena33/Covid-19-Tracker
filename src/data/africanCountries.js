const africanCountries = [
    {
      "name": "Algeria",
      "alpha2Code": "DZ",
      "alpha3Code": "DZA"
    },
    {
      "name": "Angola",
      "alpha2Code": "AO",
      "alpha3Code": "AGO"
    },
    {
      "name": "Benin",
      "alpha2Code": "BJ",
      "alpha3Code": "BEN"
    },
    {
      "name": "Botswana",
      "alpha2Code": "BW",
      "alpha3Code": "BWA"
    },
    {
      "name": "British Indian Ocean Territory",
      "alpha2Code": "IO",
      "alpha3Code": "IOT"
    },
    {
      "name": "Burkina Faso",
      "alpha2Code": "BF",
      "alpha3Code": "BFA"
    },
    {
      "name": "Burundi",
      "alpha2Code": "BI",
      "alpha3Code": "BDI"
    },
    {
      "name": "Cameroon",
      "alpha2Code": "CM",
      "alpha3Code": "CMR"
    },
    {
      "name": "Cabo Verde",
      "alpha2Code": "CV",
      "alpha3Code": "CPV"
    },
    {
      "name": "Central African Republic",
      "alpha2Code": "CF",
      "alpha3Code": "CAF"
    },
    {
      "name": "Chad",
      "alpha2Code": "TD",
      "alpha3Code": "TCD"
    },
    {
      "name": "Comoros",
      "alpha2Code": "KM",
      "alpha3Code": "COM"
    },
    {
      "name": "Congo",
      "alpha2Code": "CG",
      "alpha3Code": "COG"
    },
    {
      "name": "DRC",
      "alpha2Code": "CD",
      "alpha3Code": "COD"
    },
    {
      "name": "Djibouti",
      "alpha2Code": "DJ",
      "alpha3Code": "DJI"
    },
    {
      "name": "Egypt",
      "alpha2Code": "EG",
      "alpha3Code": "EGY"
    },
    {
      "name": "Equatorial Guinea",
      "alpha2Code": "GQ",
      "alpha3Code": "GNQ"
    },
    {
      "name": "Eritrea",
      "alpha2Code": "ER",
      "alpha3Code": "ERI"
    },
    {
      "name": "Ethiopia",
      "alpha2Code": "ET",
      "alpha3Code": "ETH"
    },
    {
      "name": "French Southern Territories",
      "alpha2Code": "TF",
      "alpha3Code": "ATF"
    },
    {
      "name": "Gabon",
      "alpha2Code": "GA",
      "alpha3Code": "GAB"
    },
    {
      "name": "Gambia",
      "alpha2Code": "GM",
      "alpha3Code": "GMB"
    },
    {
      "name": "Ghana",
      "alpha2Code": "GH",
      "alpha3Code": "GHA"
    },
    {
      "name": "Guinea",
      "alpha2Code": "GN",
      "alpha3Code": "GIN"
    },
    {
      "name": "Guinea-Bissau",
      "alpha2Code": "GW",
      "alpha3Code": "GNB"
    },
    {
      "name": "Côte d'Ivoire",
      "alpha2Code": "CI",
      "alpha3Code": "CIV"
    },
    {
      "name": "Kenya",
      "alpha2Code": "KE",
      "alpha3Code": "KEN"
    },
    {
      "name": "Lesotho",
      "alpha2Code": "LS",
      "alpha3Code": "LSO"
    },
    {
      "name": "Liberia",
      "alpha2Code": "LR",
      "alpha3Code": "LBR"
    },
    {
      "name": "Libya",
      "alpha2Code": "LY",
      "alpha3Code": "LBY"
    },
    {
      "name": "Madagascar",
      "alpha2Code": "MG",
      "alpha3Code": "MDG"
    },
    {
      "name": "Malawi",
      "alpha2Code": "MW",
      "alpha3Code": "MWI"
    },
    {
      "name": "Mali",
      "alpha2Code": "ML",
      "alpha3Code": "MLI"
    },
    {
      "name": "Mauritania",
      "alpha2Code": "MR",
      "alpha3Code": "MRT"
    },
    {
      "name": "Mauritius",
      "alpha2Code": "MU",
      "alpha3Code": "MUS"
    },
    {
      "name": "Mayotte",
      "alpha2Code": "YT",
      "alpha3Code": "MYT"
    },
    {
      "name": "Morocco",
      "alpha2Code": "MA",
      "alpha3Code": "MAR"
    },
    {
      "name": "Mozambique",
      "alpha2Code": "MZ",
      "alpha3Code": "MOZ"
    },
    {
      "name": "Namibia",
      "alpha2Code": "NA",
      "alpha3Code": "NAM"
    },
    {
      "name": "Niger",
      "alpha2Code": "NE",
      "alpha3Code": "NER"
    },
    {
      "name": "Nigeria",
      "alpha2Code": "NG",
      "alpha3Code": "NGA"
    },
    {
      "name": "R\u00e9union",
      "alpha2Code": "RE",
      "alpha3Code": "REU"
    },
    {
      "name": "Rwanda",
      "alpha2Code": "RW",
      "alpha3Code": "RWA"
    },
    {
      "name": "Saint Helena, Ascension and Tristan da Cunha",
      "alpha2Code": "SH",
      "alpha3Code": "SHN"
    },
    {
      "name": "Sao Tome and Principe",
      "alpha2Code": "ST",
      "alpha3Code": "STP"
    },
    {
      "name": "Senegal",
      "alpha2Code": "SN",
      "alpha3Code": "SEN"
    },
    {
      "name": "Seychelles",
      "alpha2Code": "SC",
      "alpha3Code": "SYC"
    },
    {
      "name": "Sierra Leone",
      "alpha2Code": "SL",
      "alpha3Code": "SLE"
    },
    {
      "name": "Somalia",
      "alpha2Code": "SO",
      "alpha3Code": "SOM"
    },
    {
      "name": "South Africa",
      "alpha2Code": "ZA",
      "alpha3Code": "ZAF"
    },
    {
      "name": "South Sudan",
      "alpha2Code": "SS",
      "alpha3Code": "SSD"
    },
    {
      "name": "Sudan",
      "alpha2Code": "SD",
      "alpha3Code": "SDN"
    },
    {
      "name": "Swaziland",
      "alpha2Code": "SZ",
      "alpha3Code": "SWZ"
    },
    {
      "name": "Tanzania",
      "alpha2Code": "TZ",
      "alpha3Code": "TZA"
    },
    {
      "name": "Togo",
      "alpha2Code": "TG",
      "alpha3Code": "TGO"
    },
    {
      "name": "Tunisia",
      "alpha2Code": "TN",
      "alpha3Code": "TUN"
    },
    {
      "name": "Uganda",
      "alpha2Code": "UG",
      "alpha3Code": "UGA"
    },
    {
      "name": "Western Sahara",
      "alpha2Code": "EH",
      "alpha3Code": "ESH"
    },
    {
      "name": "Zambia",
      "alpha2Code": "ZM",
      "alpha3Code": "ZMB"
    },
    {
      "name": "Zimbabwe",
      "alpha2Code": "ZW",
      "alpha3Code": "ZWE"
    }
  ]
  
export default africanCountries;