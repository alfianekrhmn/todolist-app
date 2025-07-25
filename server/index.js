const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
const todoRoutes = require('./routes/todos'); // Import routes dari file

// Semua Request ke /api/todos akan diarahkan ke routes/todos.js
app.use('/api/todos', todoRoutes)

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('ToDo List API is running')
});

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    })
    .catch((err) => console.error(err))