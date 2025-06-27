const mongoose = require('mongoose');
require('dotenv').config();

async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Successfully connected to MongoDB");
    } catch(error) {
        console.error("Connection to MongoDB failed", error);
    }
}

module.exports = connectToMongoDB;