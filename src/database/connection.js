const mongoose = require('mongoose');
const config=require('../config/config');
const connectDB = async () => {
    try {
        console.info("Connecting to database...");
        await mongoose.connect(config.MONGO_URI);
        console.info("Database connected");
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

module.exports = connectDB;
