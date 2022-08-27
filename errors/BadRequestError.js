const { BAD_REQ_ERR_CODE } = require('../utils/errorConstants');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.statusCode = BAD_REQ_ERR_CODE;
  }
}

module.exports = BadRequestError;
