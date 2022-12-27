import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
  const msg_TooManyMatches = "Too many matches, specify another filter";
  const msg_NoMatches = "Zero matches, please try another filter"
  const [newSearch, setNewSearch] = useState('')
  const [newResult, setNewResult] = useState('Loading Data...')
  const [countriesData, setCountriesData] = useState([])

  const handleShowButton = (event) => {
    event.preventDefault()
    setNewSearch(event.target.id)
    handleSearchChange(event, event.target.id)
  }

  const handleSearchChange = (event, override=null) => {
    let searchTerm = event.target.value
    if(override != null)
      searchTerm = override
    setNewSearch(searchTerm)
    let result = msg_TooManyMatches;
    if(searchTerm.trim().length >= 1){
      let matches = countriesData.filter(country => country.name.common.toLowerCase().includes(searchTerm.toLowerCase()))
      if(matches.length > 0 && matches.length <= 10){
        if(matches.length === 1){
          let country = matches[0]
          console.log(country)
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
  }

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        //console.log("response :: ", response.data)
        // filtering out countries that contain another country within their name, like, 'Philly' is within 'Southeast New Philly v2.0'
        let countries = response.data.filter(country=>response.data.filter(cc=>cc.name.common.indexOf(country.name.common) > 0).length == 1)
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
    </div>
  )
}

export default App