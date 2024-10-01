const express = require('express');
const cors = require('cors');
const authRoutes = require('../src/routes/loginRoute');
const connectDB = require('../config/db.config');
connectDB();
require('dotenv').config();


const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("API is ok");
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
