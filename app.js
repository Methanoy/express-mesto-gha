const express = require('express');
const mongoose = require('mongoose');
const cards = require('./routes/cards');
const router = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use('/users', router);

app.use((req, res, next) => {
  req.user = {
    _id: '62f40a728f9616015d6614e0',
  };
  next();
});

app.use('/cards', cards);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
