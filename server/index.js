// Index.js

// variable express berfungsi sebagai mengimport module express yang akan digunakan untuk membuat server HTTP
const express = require("express");

// Variable mongoose berfungsi sebagai mengimport module mongoose yang akan digunakan untuk koneksi dan operasi database MongoDB
const mongoose = require("mongoose");

//Variable cors berfungsi sebagai mengimport module cors yang akan digunakan agar server dapat diakses dari domain/frontend lain (Cross-Origin Resource Sharing)
const cors = require("cors");

// Mengimpor module dotenv untuk membaca dari variable file .env
require("dotenv").config();

// Membuat instance aplikasi Express
const app = express();

// Mengatur PORT yang akan digunakan, prioritas dari .env jika ada, kalau tidak 5000
const PORT = process.env.PORT || 5000;

// Middleware #1 : Berfungsi untuk mengaktifkan CORS agar frontend bisa mengakses API meskipun beda origin/domain
app.use(cors());

// Middleware #2 : Berfungsi untuk mengaktifkan parsing JSON dari body request
// Misalnya kalau ada post request dengan JSON body, Express bisa langsung baca
app.use(express.json());

// Import file route todo
const todoRoutes = require("./routes/todos");

// Gunakan route dengan prefix /todos
app.use("/todos", todoRoutes)


// Rute dasar "/" => untuk diuji coba apakah berjalan dengan baik
app.get("/", (req, res) => {
    res.send("API is running...")
});

/*
    Bagian ini untuk menghubungkan ke MongoDB
        -process.env.MONGO_URI akan membaca URI dari file .env
        -mongoose.connect() menghubungkan aplikasi ke MongoDB
*/
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {

    // Kalau koneksi sukses, tampilkan pesan dan jalankan server
    console.log("MongoDB Connected");

    // Memulai server Express di PORT yang sudah ditentukan
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))

    // Kalau gagal connect ke database, tampilkan pesan eror
}).catch(err => console.log(err));