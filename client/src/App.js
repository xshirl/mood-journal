import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from 'react';
import Journals from './components/Journals';
import { getJournals } from '../api/apiCalls';
import { verifyuser } from './api/apiUsers';


function App() {
  const [journals, setJournals] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  
  useEffect(async () => {
    const response = await getJournals();
    setJournals(response.data);
    const userResponse = await verifyuser();
    setCurrentUser(userResponse.user);

  })

  signout = async () => {
    localStorage.removeItem("token");
    setCurrentUser(null);
  }

  return (
    <div className="App">
      <Journals journals={journals} />
      
    </div>
  );
}

export default App;
