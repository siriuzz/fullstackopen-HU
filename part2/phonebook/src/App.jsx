import { useState, useEffect } from 'react'
import axios from 'axios';
// import Filter from './components/Filter'
// import PersonForm from './components/PersonForm';

function Filter({ nameFilter, setNameFilter }) {
  return (
    <p>filter results with name: <input value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} /></p>
  )
}


function PersonForm({ newName, setNewName, newNumber, setNewNumber, addPerson }) {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={(e) => setNewName(e.target.value)} />
      </div>
      <div>number: <input value={newNumber} onChange={(e) => setNewNumber(e.target.value)} /></div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  )
}
function Persons({ namesToShow }) {
  return (
    <>
      {namesToShow.map((person, i) => {
        return <Person key={i} person={person} />
      })}
    </>
  )
}

function Person({ person }) {
  return (
    <>
      <p>{person.name} {person.number}</p>
    </>
  )
}

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(promise => {
      const data = promise.data;
      setPersons(data);
    }
    )

  }, [])

  const addPerson = (e) => {
    e.preventDefault();
    if (persons.reduce((prev, curr) => {
      return curr.name == newName || curr.number == newNumber
    }, false)) return alert(`The name ${newName} or number ${newNumber} is already added to the phonebook`);
    setPersons(persons.concat({ name: newName, number: newNumber }))
    setNewName('');
    setNewNumber('');
  }

  const namesToShow = nameFilter === '' ? persons : persons.filter((person) => person.name.toLowerCase() == nameFilter.toLowerCase())
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h2>add new person and number</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <Persons namesToShow={namesToShow} />
    </div>
  )
}

export default App