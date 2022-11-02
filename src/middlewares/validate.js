import HttpException from '@exceptions/HttpException';
import httpStatus from 'http-status';
import { ValidationError } from 'yup';

const validate = schema => (req, res, next) => {
  try {
    schema.validateSync(
      {
        body: req.body,
        params: req.params,
        query: req.query,
      },
      { abortEarly: false }
    );
    next();
  } catch (error) {
    if (error instanceof ValidationError) throw new HttpException(httpStatus.BAD_REQUEST, error.message);
  }
};

export default validate;
