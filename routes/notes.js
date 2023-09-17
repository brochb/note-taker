const notes = require('express').Router();
const { readFromFile, writeToFile } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

notes.post('/', (req, res) => {
    console.log(req.body);

    const { title, text } = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        readFromFile('./db/db.json')
            .then((data) => {
                const notes = JSON.parse(data);
                notes.push(newNote);
                writeToFile('./db/db.json', notes);
                res.json(`Note added successfully`);
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: 'Failed to add note' });
            });
    } else {
        res.status(400).json({ error: 'Invalid request' });
    }
});

notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    readFromFile('./db/db.json')
        .then((data) => {
            const notes = JSON.parse(data);
            const filteredNotes = notes.filter((note) => note.id !== noteId);
            writeToFile('./db/db.json', filteredNotes);
            res.json({ message: 'Note deleted successfully' });
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to delete note' });
        });
});

module.exports = notes;
