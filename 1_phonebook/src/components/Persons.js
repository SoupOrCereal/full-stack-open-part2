const Person = ({person}) => <p>{person.name} {person.number}</p>

const Persons = ({persons, newSearch}) =>{
    return(
        <ul>
            {persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase())).map(person =>
                <Person key={person.id} person={person} />
            )}
        </ul>
    )
  }

export default Persons