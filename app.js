const express = require('express');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62f40a728f9616015d6614e0',
  };
  next();
});

app.use('/', (req, res) => res.status(404).send({ message: 'Указан неправильный путь.' }));
app.use('/users', userRouter);
app.use('/cards', cardsRouter);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
