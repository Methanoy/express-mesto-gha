const NOT_FND_ERR_CODE = require('../utils/errorConstants');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.codeStatus = NOT_FND_ERR_CODE;
  }
}

module.exports = NotFoundError;
