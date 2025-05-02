import React from 'react'

function People({ namesToShow, onDelete }) {
    return (
        <>
            {namesToShow.map((person, i) => {
                return <><p key={i}>{person.name} {person.number}</p><button onClick={() => onDelete(person)}>Delete</button></>
            })}
        </>
    )
}

export default People