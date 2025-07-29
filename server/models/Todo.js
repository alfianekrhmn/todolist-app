// Mengimport mongoose untuk membuat skema dan model
const mongoose = require("mongoose");

// Membuat struktur data untuk sebuah todo
const TodoSchema = new mongoose.Schema({

    // "Title" adalah judul atau isi dari tugas (required artinya wajib diisi)
    title: {
        type: String,
        required: true
    },

    // "Completed" menunjukan apakah tugas sudah selesai atau belum
    completed: {
        type: Boolean,
        default: false
    },

    // "CreatedAT" menyimpan waktu saat todo dibuat
    createdAt: {
        type: Date,
        default: Date.now // Otomatis terisi waktu saat data dibuat
    }
});

// Membuat model bernama "Todo" berdasarkan TodoSchema
// Nama koleksinya di MongoDB akan menjadi 'todos'
module.exports = mongoose.model("Todo", TodoSchema);