const express = require('express');
const connectDB = require('../config/db');
const cors = require('cors');

const images = require('./routes/api/images');

const app = express();

connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use(express.static('build'))

app.get('/', (req, res) => res.send('Hello world!'));

app.use('/api/images', images);

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));