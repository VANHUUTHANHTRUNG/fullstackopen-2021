import React from 'react'

const Notes = ({ notes }) => {
  return (
    <div>
      {notes.map((n) => (
        <p key={n.id}>{n.content}</p>
      ))}
    </div>
  )
}

export default Notes
