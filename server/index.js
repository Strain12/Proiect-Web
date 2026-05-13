const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors())

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dashboard')
 .then(function() {
 console.log('Conectat la MongoDB!');
 })
 .catch(function(err) {
 console.error('Eroare conectare MongoDB:', err);
 });
const PORT = 3000;

const Project = require('./models/Project');


// Prima ruta: raspunde la GET /
app.get('/', function(req, res) {
 res.json({ message: 'Serverul functioneaza!' });
});
// Porneste serverul


app.use(express.json());
// POST /api/projects - adauga un proiect nou
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


app.delete('/api/projects/:id', async function (req, res) {
  const id = req.params.id;
  const projects = await Project.find();
  const index = projects.findIndex(p => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Not found' });
  }

  projects.splice(index, 1);

  res.json({ message: 'Deleted' });
});



// GET /api/projects - returneaza toate proiectele
app.get('/api/projects', async function(req, res) {
 try {
 const projects = await Project.find();
 res.json(projects);
 } catch (err) {
 res.status(500).json({ error: 'Eroare ' + err });
 }
});


app.get('/api/stats', async function (req, res) {
  try {
    const total = await Project.countDocuments();
    const done = await Project.countDocuments({ done: true });
    const inProgress = await Project.countDocuments({ done: false });
    res.json({
    total,
    done,
    inProgress
  });
  }catch (err) {
    return res.status(500).json({ error: 'Eroare ' + err });
  }
  
});





app.listen(PORT, function() {
 console.log('Server pornit pe http://localhost:' + PORT);
});
