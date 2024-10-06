const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db.config');
const authRoutes = require('../src/routes/authRoute');
const newsApiRoutes = require('../src/routes/newsAPI/newsApi');

connectDB();
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (request, res) => {
    res.send("API is ok");
});

app.use('/api/auth', authRoutes);
app.use('/api/newsapi', newsApiRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));