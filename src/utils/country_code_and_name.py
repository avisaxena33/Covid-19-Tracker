import requests
import json

url = 'https://restcountries.com/v2/all'

resp = requests.get(url)
results = resp.json()

america_countries = [{'name': country['name'], 'alpha2Code': country['alpha2Code'], 'alpha3Code': country['alpha3Code']} for country in results if 'continent' in country and country['continent'] == 'Americas' and country['region'] != 'South America']
json_formatted_str = json.dumps(america_countries, indent=2)

print(json_formatted_str, len(america_countries))
