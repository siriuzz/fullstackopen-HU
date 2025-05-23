import { useState, useEffect } from 'react'
import peopleService from './services/people';
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
function People({ namesToShow, onDelete }) {
  return (
    <>
      {namesToShow.map((person, i) => {
        return <div key={i}><Person person={person} onDelete={onDelete} /></div>
      })}
    </>
  )
}

function Person({ person, onDelete }) {
  return (
    <>
      <p>{person.name} {person.number}</p>
      <button onClick={() => onDelete(person)}>Delete</button>
    </>
  )
}

const App = () => {
  const [people, setPeople] = useState([])
  const [newName, setNewName] = useState('');
  const [nameFilter, setNameFilter] = useState('');
  const [newNumber, setNewNumber] = useState('');

  useEffect(() => {
    peopleService.getAll().then((data) => setPeople(data))

  }, [])

  const addPerson = (e) => {
    e.preventDefault();
    if (people.reduce((prev, curr) => {
      return curr.name == newName || curr.number == newNumber
    }, false)) return alert(`The name ${newName} or number ${newNumber} is already added to the phonebook`);
    peopleService.create({ name: newName, number: newNumber }).then(
      (data) => {
        console.log(data);
        setPeople(people.concat({ name: newName, number: newNumber }));
        setNewName('');
        setNewNumber('');
      }
    );
  }

  const deletePerson = (person) => {
    console.log(person);
    if (
      window.confirm(`This action is not reversible, are you sure? User to delete: ${person.name}`)
    ) peopleService.deletePerson(person.id).then(() => console.log(`persona con id ${person.id} borrada`)).then(
      () => setPeople(people.filter((curr) => person.id !== curr.id))
    );

  }

  const namesToShow = nameFilter === '' ? people : people.filter((person) => person.name.toLowerCase() == nameFilter.toLowerCase())
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h2>add new person and number</h2>
      <PersonForm newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addPerson={addPerson} />
      <h2>Numbers</h2>
      <People namesToShow={namesToShow} onDelete={deletePerson} />
    </div>
  )
}

export default App