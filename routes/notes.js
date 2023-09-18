const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const fs = require('fs/promises')


notes.get('/', (req, res) => {
    fs.readFile('./db/db.json', 'utf8').then((data) => res.json(JSON.parse(data)))
        .catch((err) => {
            console.error(err);
            res.status(500).json({ error: 'Failed to fetch notes' });
        });
});

notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    fs.readFile('./db/notes.json')
        .then((data) => JSON.parse(data))
        .then((json) => {
            const result = json.filter((note) => note.note_id === noteId);
            return result.length > 0
                ? res.json(result)
                : res.json('No note with that ID');
        });
});

notes.post('/', (req, res) => {
    const { title, text } = req.body;

    // Check if title and text are present and not empty
    if (!title || !text) {
        return res.status(400).json({ error: 'Both title and text are required fields' });
    }

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        fs.readFile('./db/db.json')
            .then((data) => {
                const existingNotes = JSON.parse(data);
                existingNotes.push(newNote);
                fs.writeFile('./db/db.json', JSON.stringify(existingNotes), (err) => {
                    if (err) {
                        console.error(err);
                        return res.status(500).json({ error: 'Failed to add note' });
                    }
                    res.json('Note added successfully');
                });
            })
            .catch((err) => {
                console.error(err);
                res.status(500).json({ error: 'Failed to read notes' });
            });
    }
});



notes.delete('/:id', (req, res) => {
    const noteId = req.params.id;

    fs.readFile('./db/db.json')
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
