require('dotenv').config()
const express = require('express');
const connectDB = require('../config/db');
const cors = require('cors');

const images = require('./routes/api/images');
const users = require('./routes/api/users')
const loginRouter = require('./controllers/login')

const app = express();

connectDB();

app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ extended: false }));
app.use(express.static('build'))

app.get('/', (req, res) => res.send('hello...'));

app.use('/api/images', images)
app.use('/api/users', users)
app.use('/api/login', loginRouter)

const port = process.env.PORT || 8082;

app.listen(port, () => console.log(`Server running on port ${port}`));