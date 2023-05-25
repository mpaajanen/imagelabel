require('dotenv').config()
const express = require('express');
const connectDB = require('../config/db');
const cors = require('cors');
const path = require('path')

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

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, './build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(port, () => console.log(`Server running on port ${port}`));