import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [newName, setNewName] = useState('')

  const addName = (event) => {
    event.preventDefault()
    console.log('add name for "', newName, '"')
    if(persons.find(person => person.name === newName)){
      alert(`${newName} is already added to phonebook`);
    }else{
      setPersons(persons.concat({ name: newName }))
      setNewName("")
    }
    
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input 
            value={newName}
            onChange={handleNameChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form> 

      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <p key={person.name}>{person.name}</p>
        )}
      </ul>
    </div>
  )
}

export default App