const express = require('express');
const path = require('path');
const notesData = require('./db/db.json');
const fs = require('fs')
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    console.log('Get Success');
    console.log(data);
    res.json(JSON.parse(data));
  });
});

app.get('/api/notes', (req, res) => {
  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to read notes' });
    }
    console.log('Get Success');
    res.json(JSON.parse(data));
  });
});

app.post('/api/notes', (req, res) => {
  const newNote = req.body;
  newNote.title = noteTitle.value
  newNote.text = noteText.value
  newNote.id = uuidv4();

  notesData.push(newNote);

  fs.writeFile('./db/db.json', JSON.stringify(notesData), (err) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Failed to save note' });
    }
    console.log('Post Success');
    res.json(newNote);
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});