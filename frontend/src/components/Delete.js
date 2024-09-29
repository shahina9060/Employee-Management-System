import React from 'react'

const Delete = ({id}) => {
  return (
    <div>
      <h2>Are you sure ?</h2>
      <p>Do you want to delete {id}?</p>
      <button>yes</button>
    </div>
  )
}

export default Delete