import React from 'react'

function Journal({title, content, date}) {
  return (
    <div>
      <h1>{title}</h1>
      <h4>{date}</h4>
      <p>{content}</p>
      <button>Edit</button>
      <button>Delete</button>
    </div>
  )
}

export default Journal
