import mongoose from 'mongoose';
import httpStatus from 'http-status';

import { NODE_ENV } from '@config/index';
import HttpException from '@exceptions/HttpException';
import logger from '@utils/logger';

export const errorConverter = (err, req, res, next) => {
  let error = err;
  if (!(error instanceof HttpException)) {
    const statusCode =
      error.statusCode || error instanceof mongoose.Error ? httpStatus.BAD_REQUEST : httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    error = new HttpException(statusCode, message, false, err.stack);
  }
  next(error);
};

export const errorHandler = (err, req, res) => {
  let { statusCode, message } = err;
  if (NODE_ENV === 'production' && !err.isOperational) {
    statusCode = httpStatus.INTERNAL_SERVER_ERROR;
    message = httpStatus[httpStatus.INTERNAL_SERVER_ERROR];
  }

  res.locals.errorMessage = err.message;

  const response = {
    code: statusCode,
    message,
    ...(NODE_ENV === 'development' && { stack: err.stack }),
  };

  if (NODE_ENV === 'development') {
    logger.error(err);
  }

  res.status(statusCode).json(response);
};
