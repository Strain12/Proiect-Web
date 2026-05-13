import { useState } from 'react';

function DataForApi({ projects, setProjects }) {
  const [title, setTitle] = useState('');
  const [tech, setTech] = useState('');
  async function handleSubmit() {

    try {
        const response = await fetch('http://localhost:3000/api/projects', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, tech: tech }),
        });
        const newProject = await response.json();
        setProjects([...projects, newProject]);
        setTitle(''); // Goleste input-urile
        setTech('');
    } catch (err) {
        console.error('Eroare:', err);
    }
}

 


  return (
    <div>
      <h3>Adaugă un proiect nou</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Titlu proiect..."
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <input
            type="text"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            placeholder="Tehnologii (ex: React, Node)..."
            style={{ marginRight: '10px', padding: '5px' }}
          />
          <button 
            type="submit"
            style={{ 
              backgroundColor: 'black', 
              color: 'white', 
              border: '1px solid black', 
              padding: '5px 10px', 
              cursor: 'pointer' 
            }}
          >
            Adaugă Proiect
          </button>
        </div>
      </form>

    </div>
  );
}

export default DataForApi;