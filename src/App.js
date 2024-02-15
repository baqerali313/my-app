import Axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);
  const [input, setinput] = useState("");
  const [editInput, setEditInput] = useState("");

  function getall() {
    Axios.get("http://localhost:5000/notes").then((res) => {
      setNotes(res.data);
    });
  }

  function postone() {
    Axios.post("http://localhost:5000/notes", {
      content: input,
    });
    getall();
  }

  const editNote = async (id) => {
    await Axios.put(`http://localhost:5000/notes/${id}`, {
      content: editInput[id],
    });
    getall();
    
  };

  const deleteNote = async (id) => {
    await Axios.delete(`http://localhost:5000/notes/${id}`);
   getall(); 
  };

  useEffect(() => {
    getall();
  }, []);

  return (
    <>
      <div>
        <input
          type="text"
          placeholder="note..."
          onChange={(e) => {
            setinput(e.target.value);
          }}
        />
        <button onClick={postone}>add</button>
      </div>
      <div className="App">
        {notes.map((note) => (
          <div key={note.id}>
            <h1>{note.content}</h1>
            <input
              type="text"
              value={editInput[note.id] || ''} 
            onChange={(e) => setEditInput({...editInput, [note.id]: e.target.value})} 

            />
            <button onClick={() => editNote(note.id)}>Edit</button>
            <button onClick={() => deleteNote(note.id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
