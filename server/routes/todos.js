const express = require('express');
const router = express.Router(); // Membuat mini Router khusus untuk todo
const Todo = require('../models/Todo');

// Route : GET /api/todos
// Fungsi: Mengambil semua todo dari database
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find(); // kirim respon sukses dengan data todos
        res.json(todos)
    }catch (err) {
        res.status(500).json({eror: `Gagal mengambil todo`});
    }
});

// Route: POST /api/todos
// Fungsi: Menambahkan todo baru ke database
router.post('/', async (req, res) => {
    const {title} = req.body; // Ambil Title dari request body

    try {
        const newTodo = new Todo({title}); // Membuat instance todo baru
        await newTodo.save(); // Simpan ke database
        res.status(201).json(newTodo); //Kirim respon sukses
    } catch (err) {
        res.status(400).json({eror: 'Gagal menambah Todo'});
    }
});

// Route: Put /api/todos/:id
// Fungsi: Mengedit todo berdasarkan ID (misalnya mengubah status 'completed')
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { title, completed } = req.body;

    try {
        const updatedTodo = await Todo.findByIdAndUpdate(
            id,
            { title, completed }, // Data yang diubah
            {new: true} // new: true artinya kirim data yang sudah diupdate
        );
        
        res.status(200).json(updatedTodo);
    } catch (err) {
        res.status(400).json({eror: 'Gagal mengupdate todo'});
    }
});

// Route: Delete /api/todos/:id
// Fungsi: Menghapus todo berdasarkan ID
router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    
    try {
        await Todo.findByIdAndDelete(id); // Cari dan hapus berdasarkan ID
        res.status(204).end(); // Status 204 = sukses tanpa kirim data balik
    } catch (err) {
        res.status(400).json({eror: 'Gagal menghapus todo'});
    }
});

module.exports = router; // Export router agar bisa dipakai di index.js