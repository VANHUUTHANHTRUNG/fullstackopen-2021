import React from 'react'

const Notification = ({ notification }) => {
  const style = {
    borderStyle: 'solid',
    borderRadius: '5px',
    padding: '10px',
    textAlign: 'center',
  }
  if (notification === '') return null
  return (
    <div style={style}>
      <p>{notification}</p>
    </div>
  )
}

export default Notification
