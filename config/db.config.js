// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config();
// import mongoose from 'mongoose';

const path = require('path');
require('dotenv').config();

const mongoose = require('mongoose');

const dbURI = process.env.MONGO_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {});
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
// export default connectDB;