class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
    this.codeStatus = 404;
  }
}

module.exports = NotFoundError;
