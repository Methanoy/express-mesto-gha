const { SERV_ERR_CODE } = require('../utils/errorConstants');

module.exports = (err, req, res, next) => {
  const { statusCode = SERV_ERR_CODE, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === SERV_ERR_CODE
        ? 'Упс, на сервере произошла ошибка. Простите :('
        : message,
    });

  next();
};
