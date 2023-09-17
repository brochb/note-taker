const express = require('express');
const path = require('path');
const notesData = require('./db/db.json')
const fs = require('fs')
// const uuid = require('./helpers/uuid');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

app.get('/notes', (req, res) =>
res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/api/notes', (req, res) => { res.json(notesData);
  res.readFile(path.join(__dirname, 'public/db/db.json'))

});

app.post('/api/notes', (req, res) => { res.json(notesData)
  res.writeFile(path.join(__dirname, 'public/db/db.json'))
    console.log('Post Success')
});

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});