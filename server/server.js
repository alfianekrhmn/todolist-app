const express = require('express');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const todoRoutes = require('./routes/todos');
app.use('./routes/todos', todoRoutes);

app.get('/', (req, res) => {
    res.send('ToDo List API is running')
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})