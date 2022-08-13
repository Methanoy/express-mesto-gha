class ServerError extends Error {
  constructor(message) {
    super(message);
    this.name = 'ServerError';
    this.codeStatus = 500;
  }
}

module.exports = ServerError;
