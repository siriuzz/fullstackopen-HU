import React from 'react'

function Persons({ namesToShow }) {
    return (
        <>
            {namesToShow.map((person, i) => {
                return <p key={i}>{person.name} {person.number}</p>
            })}
        </>
    )
}

export default Persons