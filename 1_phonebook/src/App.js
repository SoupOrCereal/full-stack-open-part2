import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Loading', number: '...', id: -1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('add name for "', newName, '"')
    if(persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`);
    }else{
      setPersons(persons.concat({ name: newName, number: newNumber, id: persons.length+1 }))
      setNewName("")
      setNewNumber("")
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setNewSearch(event.target.value)
  }

  useEffect(() => {
    //console.log('getting names from DB...')
    axios
      .get('http://localhost:3001/db')
      .then(response => {
        //console.log("DB response :: ", response.data)
        setPersons(response.data.persons)
      })
  }, [])
  
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch={newSearch} handleSearchChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm addName={addName} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <Persons persons={persons} newSearch={newSearch} />
    </div>
  )
}

export default App