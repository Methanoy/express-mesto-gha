require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');
const { NOT_FND_ERR_CODE } = require('./utils/errorConstants');
const { createUser, login } = require('./controllers/users');
const auth = require('./middlewares/auth');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(cookieParser());

app.post('/signin', login);
app.post('/signup', createUser);

// app.use(auth);

// app.use((req, res, next) => {
//   req.user = {
//     _id: '62fb765e370b5375dda56cff',
//   };
//   next();
// });

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardsRouter);
app.use('*', (req, res) => res.status(NOT_FND_ERR_CODE).send({ message: 'Указан неправильный путь.' }));

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Упс, на сервере произошла ошибка. Простите :('
        : message,
    });

  next();
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
