import React from "react"

function Journals({ journals }) {
  return (
    <div>
      {journals.map((journal) => {
        <Journal title={journal.title} content={journal.content} date={journal.date} />
      })}
    </div>
  )
}

export default Journals
