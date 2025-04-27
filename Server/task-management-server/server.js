const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv').config({path: __dirname + '/.env'});


const app = require('./src/app');
//dotenv.config();

const PORT = process.env.PORT || 5000;

app.get('/Test', (req, res) => {
    res.send('hello World Test Success');
});

    

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});