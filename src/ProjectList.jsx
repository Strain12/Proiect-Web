import { useState, useEffect } from 'react';
import Card from './Card';
import Todolist from './TodoList';
function ProjectList() {
 const [filtru, setFiltru] = useState('');
 const [projects, setProjects] = useState([]);
 const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null)
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

 if (loading) {
 return <p>Se incarca...</p>;
 }

 if(error){
    return <p>Eroare...</p>;  
 }

 async function handleDelete(id) {
   try {
         await fetch('http://localhost:3000/api/projects/' + id, {
             method: 'DELETE',
         });
       setProjects(projects.filter((p) => p._id !== id));
   } catch (err) {
     console.error('Eroare:', err);
   }
 }

 return (
 <div>
 <h3>Proiecte</h3>
    <input
        type="text"
        placeholder="Cauta proiect..."
        value={filtru}
        onChange={(e) => setFiltru(e.target.value)}
    />  
 {projects
    .filter(function(p) { return p.title.toLowerCase().includes(filtru.toLowerCase()); })
    .map(function(project, index) {
        return(
        <div>
            <Card key={index} title={project.title} tech={project.tech} done={project.done} />

            <button onClick={() => handleDelete(project._id)}
            type="delete"
            style={{
              backgroundColor: 'black', 
              color: 'white', 
              border: '1px solid black', 
              padding: '5px 10px', 
              cursor: 'pointer' 
            }}
          >
            Sterge Proiect
          </button> 
        </div>
               
      );

      })}
    <br></br>
    <div>
        <p>Total: {projects.length}</p>
        <p>Finalizate: {projects.filter(p => p.done).length}</p>
        <p>In lucru: {projects.filter(p => !p.done).length}</p>
    </div>
 </div>
 );
}
export default ProjectList;