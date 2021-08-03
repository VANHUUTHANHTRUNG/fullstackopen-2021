import React from 'react'

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((n) => (
        <p key={n.id}>
          {n.name} {n.number}
        </p>
      ))}
    </div>
  )
}

export default Persons
