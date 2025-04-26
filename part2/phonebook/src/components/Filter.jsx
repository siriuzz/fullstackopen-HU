import React from 'react'

function Filter({ nameFilter, setNameFilter }) {
    return (
        <p>filter results with name: <input value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} /></p>
    )
}

export default Filter