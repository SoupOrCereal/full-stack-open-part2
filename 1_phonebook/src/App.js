import { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'
import names from './services/names'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Loading', number: '...', id: -1 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')

  const addName = (event) => {
    event.preventDefault()
    if(persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`);
    }else{
      names.create({ name: newName, number: newNumber })
      .then(returnedNote => {
        setPersons(persons.concat(returnedNote))
        setNewName("")
        setNewNumber("")
      }).catch(err=>console.log("Error adding new person! ", err))
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
    names.getAll().then(allNames => {
      setPersons(allNames)
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