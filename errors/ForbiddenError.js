const { FRBDN_ERR_CODE } = require('../utils/errorConstants');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ForbiddenError';
    this.codeStatus = FRBDN_ERR_CODE;
  }
}

module.exports = ForbiddenError;
