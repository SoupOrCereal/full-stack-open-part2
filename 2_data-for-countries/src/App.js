import { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({capitalCity}) =>{
  const [weatherData, setWeatherData] = useState([])
  useEffect(() => {
    if(capitalCity != ''){
      axios
        .get('http://api.openweathermap.org/data/2.5/weather?q=' + capitalCity +'&APPID='+ process.env.REACT_APP_API_KEY)
        .then(response => {
          console.log(response.data)
          setWeatherData(response.data)
        })
    }
  }, [capitalCity])
  
  if(capitalCity == ''){
    return(<></>)
  }else if(weatherData.length < 2){
    return(
      <p>xLoading weather data...</p>
    )
  }else{
    return(
      <>
        <h2>Weather in {capitalCity}</h2>
        <p>temperature {weatherData.main.temp} Celcius</p>
        <img src={"http://openweathermap.org/img/wn/"+weatherData.weather[0].icon+"@2x.png"} alt="Weather Icon" />
        <p>wind {weatherData.wind.speed} m/s</p>
      </>
    )
  }
}


const App = () => {
  const msg_TooManyMatches = "Too many matches, specify another filter";
  const msg_NoMatches = "Zero matches, please try another filter"
  const [newSearch, setNewSearch] = useState('')
  const [newResult, setNewResult] = useState('Loading Data...')
  const [countriesData, setCountriesData] = useState([])
  const [newCapital, setNewCapital] = useState('')

  const handleShowButton = (event) => {
    event.preventDefault()
    setNewSearch(event.target.id)
    handleSearchChange(event, event.target.id)
  }
 
  const handleSearchChange = (event, override=null) => {
    let searchTerm = event.target.value
    let currentCityCapital = ''
    if(override != null)
      searchTerm = override
    setNewSearch(searchTerm)
    let result = msg_TooManyMatches;
    if(searchTerm.trim().length >= 1){
      let matches = countriesData.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
      if(matches.length > 0 && matches.length <= 10){
        if(matches.length === 1){
          let country = matches[0]
          result = (
            <>
              <h1>{country.name.common}</h1>
              <h3>capital {country.capital[0]}</h3>
              <h3>area {country.area}</h3>
              <h2><strong>languages:</strong></h2>
              <ul>
                  {
                    Object.keys(country.languages).map((kii) =>{
                      return(<li key={kii}>{country.languages[kii]}</li>)
                    } )
                  }
              </ul>
              <img src={country.flags.png} alt="Country Flag" style={{width: "196px"}} />
            </>
          )
          currentCityCapital = country.capital[0];
        }else{
          result = matches.map(country =>{
              return (
                <p key={country.name.common}>{country.name.common}<button id={country.name.common} onClick={handleShowButton}>show</button></p>
              )
          }
          )
        }
      }else if(matches.length == 0){
        result = msg_NoMatches
      }
    }else{
      result = ''
    }
    setNewResult(result);
    setNewCapital(currentCityCapital)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        // filtering out countries that contain are apart of another country's name, like, 'Philly' is apart of 'Southeast New Philly v2.0'
        let countries = response.data.filter(country =>{
          if(response.data.filter(c=>c.name.common.includes(country.name.common)).length > 1){
            return(false)
          }else{
            return(true)
          }
        })
        setCountriesData(countries);
        setNewSearch('')
        setNewResult('')
      })
  }, [])

  

  return (
    <div>
      find countries <input 
          value={newSearch}
          onChange={handleSearchChange} />
      <br />
      {newResult}
      <Weather capitalCity={newCapital} />
    </div>
  )
}

export default App