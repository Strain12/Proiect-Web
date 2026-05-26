import { useState, useEffect } from 'react';

function Home() {

    const [stats, setStats] = useState({ total: 0, done: 0, inProgress: 0 });
    const [loadingStats, setLoadingStats] = useState(true);

    useEffect(function() {
        fetch('http://localhost:3000/api/stats')
        .then(function(response) {
        return response.json();
        })
        .then(function(data) {
        setStats(data);
        setLoadingStats(false);
        })
        .catch(function(err) {
        console.error('Eroare la încărcarea statisticilor:', err);
        setLoadingStats(false);
        });
    }, []);

 return (
    <div style={{ padding: '20px', background: '#8aefff', borderRadius: '8px', marginTop: '20px' }}>
    <h4 style = {{ fontWeight: 'bold' , color: 'black' }}>Statistici Proiecte (Live din Backend)</h4>
    {loadingStats ? (
        <p>Se încarcă statisticile...</p>
    ) : (
        <div>
        <p style = {{ fontWeight: 'bold' , color: 'black' }}><strong>Total proiecte:</strong> {stats.total}</p>
        <p style = {{ fontWeight: 'bold' , color: 'black' }}><strong>Finalizate:</strong> {stats.done}</p>
        <p style = {{ fontWeight: 'bold' , color: 'black' }}><strong>În lucru:</strong> {stats.inProgress}</p>
        </div>
    )}
    </div>
 );
}
export default Home;