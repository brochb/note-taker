const express = require('express');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static('public'));

app.get('/', (req, res) => res.send('Navigate to /index or /notes'));

app.get('/send', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/routes', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

app.get('/api/notes', (req, res) => res.json()
    .res.sendFile(path.join(__dirname, 'public/assets/index.html')));

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});