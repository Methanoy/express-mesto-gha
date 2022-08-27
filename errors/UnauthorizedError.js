const { UNFRZ_ERR_CODE } = require('../utils/errorConstants');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = UNFRZ_ERR_CODE;
  }
}

module.exports = UnauthorizedError;
