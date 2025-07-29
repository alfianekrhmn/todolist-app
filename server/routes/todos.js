//  Mengimport express untuk membuat router
const express = require("express");
const router = express.Router();

// Mengimport models todo yang sudah dibuat
const Todo = require("../models/Todo");

// Route: GET /todos
// Tujuan: mengambil sebuah data todo dari database
router.get("/", async (req, res) => {
    try {
        const todos = await Todo.find(); // Cari Semua todo dari database
        res.json(todos) // Kirim hasilnya kedalam bentuk JSON
    } catch (err) {
        res.status(500).json({error: err.message}) // Tangani error
    }
});

// Route: POST /todos
// Tujuan: Menambah data todo baru
router.post("/", async (req, res) => {
    try {

        // Ambil data dari request body
        const { title } = req.body;

        // Membuat Instace todo baru
        const newTodo = new Todo({title})

        // Simpan ke Database
        const savedTodo = await newTodo.save();

        res.status(201).json(savedTodo); // Kirim todo yang baru disimpan
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Route: PUT /todos/:id
// Tujuan: Mengupdate todo berdasarkan ID
router.put("/:id", async (req, res) => {
    try {

        // Cari todo berdasarkan ID, lalu update dengan data dari request
        const updatedTodo = await Todo.findByIdAndUpdate(
            req.params.id,
            req.body, // data baru (misal: completed true)
            { new: true }  // Mengembalikan data baru setelah diupdate
        );
        res.json(updatedTodo);
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

// Route: DELETE /todos/:id
// Tujuan: Menghapus todo berdasarkan ID
router.delete("/:id", async (req, res) => {
    try {
        await Todo.findByIdAndDelete(req.params.id); // Hapus berdasarkan ID
        res.json({ message: "Todo Deleted successfully"});
    } catch (err) {
        res.status(500).json({ error: err.message});
    }
});

// Mengekspor router agar bisa digunakan di index.js
module.exports = router;