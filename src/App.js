import React,{useState,useEffect} from 'react';
import {MenuItem, Card, FormControl, Select, CardContent} from "@material-ui/core"
import './App.css';
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import {sortData} from './util'
import LineGraph from './LineGraph'


function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry ] = useState("worldwide");
  const [countryInfo, setCountryInfo ] = useState({});
  const [tableData, setTableData ] = useState([]);
//USEEFFECT runs the piece of code based on a given condition

useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all")
  .then((response) => response.json())
  .then((data) => {
    setCountryInfo(data);
  });
} , [])

useEffect(() =>{

const getCountriesData = async () => {
  await fetch("https://disease.sh/v3/covid-19/countries")
  .then((response) => response.json()) //get all the response and then select response of json object
  .then((data) => {
    const countries = data.map((country) =>(
      {
        name: country.country,    //returning name and value variables
        value: country.countryInfo.iso2,
      }
    ));
    
    const sortedData = sortData(data);
    setTableData(sortedData);      //taking unsorted lists 
    setCountries(countries);
  });
};

getCountriesData(countries);
},[])

const onCountryChange = async (event) => {
  const countryCode = event.target.value;

  const url = countryCode === "worldwide"? "https://disease.sh/v3/covid-19/all"
                            :`https://disease.sh/v3/covid-19/countries/${countryCode}`

  await fetch(url)
  .then(response => response.json())
  .then(data => {
    setCountry(countryCode);
    setCountryInfo(data);  //All of the data from the country response
  })                         
}

  console.log("COUNTRY INFO >>>" , countryInfo)


  return (
    <div className="app">
      <div className="app__left">
      <div className="app__header">
        <h1>COVID-19 TRACKER</h1>
        <FormControl className="app__dropdown">
          <Select variant="outlined" value={country} onChange={onCountryChange}>
          <MenuItem value="worldwide">Worldwide</MenuItem>
          {countries.map((country) => (
            <MenuItem value = {country.value}>{country.name}</MenuItem>
          ))}
            </Select>
        </FormControl>
      </div>
      
      <div className="app__stats">
        <InfoBox title = "Coronavirus Cases" cases={countryInfo.todayCases}  total={countryInfo.cases}/>

        <InfoBox title = "Recovered" cases={countryInfo.todayRecovered}  total={countryInfo.recovered}/>

        <InfoBox title = "Deaths" cases={countryInfo.todayDeaths}  total={countryInfo.deaths}/>
      </div>

            <Map />
        </div>
      
      <Card className="app__right">
      <LineGraph />
        <CardContent>
          <h3>Live cases by country</h3>
          <Table countries = {tableData} />
          <h3>Worldwide cases</h3>
        </CardContent>
      </Card>

    </div>
  );
}

export default App;
