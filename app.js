require('dotenv').config();
/* пакетные модули */
const express = require('express');
const helmet = require('helmet');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const rateLimit = require('express-rate-limit');
/* роутеры */
const cardsRouter = require('./routes/cards');
const userRouter = require('./routes/users');
/* ошибки */
const NotFoundError = require('./errors/NotFoundError');
/* контроллеры */
const { createUser, login, logout } = require('./controllers/users');
/* миддлвары */
const { validateLogin, validateCreateUser } = require('./middlewares/inputDataValidation');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');

const { PORT = 3000 } = process.env;

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use(limiter);

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(requestLogger);
app.use(cors);

app.post('/signin', validateLogin, login);
app.post('/signup', validateCreateUser, createUser);
app.get('/signout', auth, logout);

app.use('/users', auth, userRouter);
app.use('/cards', auth, cardsRouter);
app.use(auth, () => {
  throw new NotFoundError('Указан неправильный путь.');
});

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
