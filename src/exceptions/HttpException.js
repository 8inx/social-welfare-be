class HttpException extends Error {
  /**
   * HttpException
   * @param {number} statusCode
   * @param {string} message
   * @param {boolean} isOperational true
   * @param {string} stack
   */
  constructor(statusCode, message, isOperational = true, stack = '') {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default HttpException;
