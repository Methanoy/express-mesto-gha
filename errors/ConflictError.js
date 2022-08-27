const { CNFL_ERR_CODE } = require('../utils/errorConstants');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ConflictError';
    this.codeStatus = CNFL_ERR_CODE;
  }
}

module.exports = ConflictError;
