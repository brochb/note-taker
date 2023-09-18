const express = require('express');

const notesRouter = require('./notes');
const htmlRouter = require('./htmlRoutes');

const app = express()

app.use('/notes', notesRouter);
app.use('/', htmlRouter)

module.exports = app;