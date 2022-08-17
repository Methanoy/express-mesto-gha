const express = require('express');
const mongoose = require('mongoose');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const NOT_FND_ERR_CODE = require('./utils/errorConstants');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());

app.use((req, res, next) => {
  req.user = {
    _id: '62fb765e370b5375dda56cff',
  };
  next();
});

app.use('/users', userRouter);
app.use('/cards', cardsRouter);
app.use('*', (req, res) => res.status(NOT_FND_ERR_CODE).send({ message: 'Указан неправильный путь.' }));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
