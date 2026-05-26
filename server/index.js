const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Project = require('./models/Project');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json()); 

mongoose.connect('mongodb://localhost:27017/dashboard')
 .then(function() {
    console.log('Conectat la MongoDB!');
 })
 .catch(function(err) {
    console.error('Eroare conectare MongoDB:', err);
 });


app.get('/', function(req, res) {
 res.json({ message: 'Serverul functioneaza!' });
});

// GET /api/projects - Returnează toate proiectele
app.get('/api/projects', async function(req, res) {
 try {
    const projects = await Project.find();
    res.json(projects);
 } catch (err) {
    res.status(500).json({ error: 'Eroare ' + err });
 }
});

// POST /api/projects - Adaugă un proiect nou
app.post('/api/projects', async function(req, res) {
 try {
    const newProject = new Project({
        title: req.body.title,
        tech: req.body.tech,
        done: req.body.done || false,
    });
    const saved = await newProject.save();
    res.status(201).json(saved);
 } catch (err) {
    res.status(400).json({ error: err.message });
 }
});

// DELETE /api/projects/:id -  Șterge direct din MongoDB
app.delete('/api/projects/:id', async function (req, res) {
  try {
    const id = req.params.id;
    
    const deletedProject = await Project.findByIdAndDelete(id);

    if (!deletedProject) {
      return res.status(404).json({ error: 'Proiectul nu a fost găsit în baza de date' });
    }

    res.json({ message: 'Deleted', deletedProject });
  } catch (err) {
    res.status(500).json({ error: 'Eroare la ștergere: ' + err.message });
  }
});

// PUT /api/projects/:id - Actualizează statusul (Toggle)
app.put('/api/projects/:id', async function(req, res) {
 try {
    const updated = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Returnează documentul DUPĂ actualizare
    );
    if (!updated) return res.status(404).json({ error: 'Not found' });
    res.json(updated);
 } catch (err) {
    res.status(400).json({ error: err.message });
 }
});

// GET /api/stats - Statistici proiecte
app.get('/api/stats', async function (req, res) {
  try {
    const total = await Project.countDocuments();
    const done = await Project.countDocuments({ done: true });
    const inProgress = await Project.countDocuments({ done: false });
    res.json({ total, done, inProgress });
  } catch (err) {
    return res.status(500).json({ error: 'Eroare ' + err });
  }
});

app.listen(PORT, function() {
 console.log('Server pornit pe http://localhost:' + PORT);
});