import React from 'react'
import { useState, useEffect } from 'react';


function JournalForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [date, setDate] = useState("");


  return (
    <form>
      <label>Title</label> <input type="text" value={title} />
      <label>Entry</label> <input type="text" value={content} />
      <label></label>
    </form>
  )
}

export default JournalForm
