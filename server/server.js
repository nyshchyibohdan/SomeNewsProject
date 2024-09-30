// import express from 'express';
// import connectDB from "../config/db.config.js";
// import jwt from "jsonwebtoken";

const express = require('express');
const connectDB = require('../config/db.config');
const jwt = require('jsonwebtoken');

const PORT = process.env.PORT;
const secret = process.env.SECRET_KEY;

const app = express();

app.use(express.json()); // req.body is undefined without it

connectDB();

app.get('/', (req, res) => {
    res.send('API is OK');
    console.log("API is running");
});

app.post('/login', (req, res) => {
    console.log(req.body);
    const token = jwt.sign({
        email: req.body.email,
    }, secret);
    res.json({
        success: true,
        token
    });
})

app.listen(PORT, (err) => {
    if(err){
        return console.log(err);
    }
    console.log(`Server running on port ${PORT}`)
});