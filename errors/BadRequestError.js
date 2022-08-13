class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.name = 'BadRequestError';
    this.codeStatus = 400;
  }
}

module.exports = BadRequestError;
