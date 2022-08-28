// если мидлвар в app.js ошибки возвращаются со строкой в messange: [obj Obj]
module.exports = (err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'Упс, на сервере произошла ошибка. Простите :('
        : message,
    });

  next();
};
