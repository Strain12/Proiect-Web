import { useState, useEffect } from 'react';
import Card from './Card';
import Todolist from './TodoList';

function ProjectList() {
  const [filtru, setFiltru] = useState('');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null); 
  const [editTitle, setEditTitle] = useState('');   
  const [editTech, setEditTech] = useState('');

  useEffect(function() {
    fetch('http://localhost:3000/api/projects')
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        setProjects(data);
        setLoading(false);
      })
      .catch(function() {
        setError('Eroare la incarcarea datelor');
        setLoading(false);
      });
  }, []);

  async function handleToggle(id, currentDone) {
    try {
      const response = await fetch('http://localhost:3000/api/projects/' + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ done: !currentDone }), // Inversăm starea actuală
      });

      if (!response.ok) {
        throw new Error('Eroare la actualizare');
      }

      const updatedProject = await response.json();

      setProjects(projects.map((p) => (p._id === id ? updatedProject : p)));
    } catch (err) {
      console.error('Eroare la toggle:', err);
    }
  }

  async function handleDelete(id) {
    try {
          if (window.confirm('Sigur doriti sa stergeti acest proiect?')) {
              await fetch('http://localhost:3000/api/projects/' + id, {
                method: 'DELETE',
              });
            setProjects(projects.filter((p) => p._id !== id));
          }
      
    } catch (err) {
      console.error('Eroare:', err);
    }
  }

  function startEdit(project) {
  setEditingId(project._id);      
  setEditTitle(project.title);    
  setEditTech(project.tech);      
}

async function handleSave(id) {
  try {
    const response = await fetch('http://localhost:3000/api/projects/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: editTitle, tech: editTech }),
    });

    if (!response.ok) throw new Error('Eroare la salvare');

    const updatedProject = await response.json();
    setProjects(projects.map((p) => (p._id === id ? updatedProject : p)));
    setEditingId(null); 
  } catch (err) {
    console.error('Eroare la salvare:', err);
  }
}


  if (loading) {
    return <p>Se incarca...</p>;
  }

  if (error) {
    return <p>Eroare...</p>;
  }

  return (
    <div>
      <h3>Proiecte</h3>
      <input
        type="text"
        placeholder="Caută proiect..."
        value={filtru}
        onChange={(e) => setFiltru(e.target.value)}
        style={{
          width: '100%',
          padding: '10px 15px',
          marginBottom: '20px',
          borderRadius: '6px',
          border: '1px solid #ccc',
          fontSize: '16px',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.1)'
        }}
      />

      {projects
        .filter(function(p) {
          return p.title.toLowerCase().includes(filtru.toLowerCase());
        })
        .map(function(project) {
          
          if (editingId === project._id) {
            return (
              <div key={project._id} style={{ backgroundColor: project.done ? '#f8d29c' : '#5cb85c', margin: '15px 0', padding: '15px', border: '2px solid #007BFF' }}>
                <h4>Editează Proiectul</h4>
                <input type="text" value={editTitle} onChange={(e) => setEditTitle(e.target.value)} />
                <input type="text" value={editTech} onChange={(e) => setEditTech(e.target.value)} />
                <button onClick={() => handleSave(project._id)} style={{ backgroundColor: '#28a745', color: 'white', margin: '0 10px' }}>Salvează</button>
                <button onClick={() => setEditingId(null)} style={{ backgroundColor: '#f80313', color: 'white', margin: '0 10px' }}>Anulează</button>
              </div>
            );
          }

          return (
            <div key={project._id} style={{ backgroundColor: project.done ? '#f2c484' : '#90ee90', margin: '15px 0', padding: '10px', border: '1px solid #eee' }}>
              <Card title={project.title} tech={project.tech} done={project.done} />

              <button onClick={() => handleToggle(project._id, project.done)} style ={{ backgroundColor: project.done ? '#f0ad4e' : '#5cb85c', color: 'white', margin: '0 10px' }}>
                {project.done ? 'Marchează ca În lucru' : 'Marchează ca Finalizat'}
              </button>

              <button onClick={() => startEdit(project)} style={{ backgroundColor: '#008CBA', color: 'white', margin: '0 10px' }}>
                Editează
              </button>

              <button onClick={() => handleDelete(project._id)} style={{ backgroundColor: '#dc3545', color: 'white', margin: '0 10px' }}>
                Sterge Proiect
              </button> 
            </div>
          );
          
        })} 

      <br />
      <div>
        <p>Total: {projects.length}</p>
        <p>Finalizate: {projects.filter((p) => p.done).length}</p>
        <p>In lucru: {projects.filter((p) => !p.done).length}</p>
      </div>
    </div>
  );
}

export default ProjectList;