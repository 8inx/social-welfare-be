import { verify } from 'jsonwebtoken';

import { SECRET_KEY } from '@config';
import HttpException from '@exceptions/HttpException';
import User from '@models/User';
import logger from '@utils/logger';

const verifyToken = async (req, res, next) => {
  try {
    const Authorization = req.header('Authorization') ? req.header('Authorization').split('Bearer ')[1] : null;
    logger.info(Authorization);
    if (Authorization) {
      const dataInToken = await verify(Authorization, SECRET_KEY);
      const user = await User.findById(dataInToken._id).lean();
      if (user) {
        req.user = user;
        return next();
      } else {
        next(new HttpException(401, 'Wrong authentication token'));
      }
    } else {
      next(new HttpException(404, 'Authentication token missing'));
    }
  } catch (error) {
    next(new HttpException(401, 'Wrong authentication token'));
  }
};

const verifyAuthorization = async (req, res, next) => {
  await verifyToken(req, res, () => {
    if (req.user._id == req.params.id || req.user.role == 'admin') {
      next();
    } else {
      next(new HttpException(403, 'Not allowed'));
    }
  });
};

const verifyAdmin = async (req, res, next) => {
  await verifyToken(req, res, () => {
    if (req.user && req.user.role === 'admin') {
      next();
    } else {
      next(new HttpException(403, 'Admin token required'));
    }
  });
};

export default { verifyToken, verifyAuthorization, verifyAdmin };
