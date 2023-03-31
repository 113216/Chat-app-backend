const mongoose = require('mongoose')
require('dotenv').config();
let DB;
let connection


async function connectDB() {
    try {
        connection = await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l2opt1u.mongodb.net/?retryWrites=true&w=majority`)
        console.log('DB is Connected')
    } catch (error) {
        console.log(error)
    }
}

module.exports = { connectDB, connection }


