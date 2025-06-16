// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config();
// import mongoose from 'mongoose';
require('dotenv').config();

const mongoose = require('mongoose');

const databaseURI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(databaseURI, {});
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        // eslint-disable-next-line unicorn/no-process-exit
        process.exit(1);
    }
};

module.exports = connectDB;
// export default connectDB;
