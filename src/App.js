import Axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setinput] = useState("");



  useEffect(() => {
    Axios.get("http://localhost:5000/notes").then((res) => {
      setNotes(res.data); 
    });
  }, []);

  useEffect(() => {
    Axios.get("http://localhost:5000/notes").then((res) => {
      setNotes(res.data); 
    });
  }, []); 

  return (
    <>
    <div>
    <input type="text" placeholder='note...' onChange={(e)=>{
      setinput(e.target.value)
    }}/>
    </div>
    <div className="App">
      {notes.map(note => <h1 key={note.id}>{note.content}</h1>)}
    </div>
    </>
  );
}

export default App;
