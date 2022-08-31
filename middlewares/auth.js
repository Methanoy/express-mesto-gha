const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

// const { JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'dev-secret');
  } catch (err) {
    throw new UnauthorizedError('Требуется авторизация.');
  }

  req.user = payload;
  return next();
};
