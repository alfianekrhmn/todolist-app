const mongoose = require('mongoose');

// Buat struktur data (schema) untuk todo
const TodoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
},
{
    timestamps: true
});

const Todo = mongoose.model('Todo', TodoSchema);

module.exports = Todo;