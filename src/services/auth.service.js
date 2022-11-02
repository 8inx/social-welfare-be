import httpStatus from 'http-status';

import HttpException from '@exceptions/HttpException';
import User from '@models/User';
import { hash, compare, createToken } from '@utils/utils';

/**
 * @function register
 * @param {object} input                  - register input
 * @returns {{user:User, token: string}}    credentials
 */
const register = async input => {
  const findUser = await User.findOne({ email: input.email });
  if (findUser) throw new HttpException(httpStatus.CONFLICT, 'Email is already taken');

  const hashedPassword = hash(input.password);
  const newUser = await User.create({ ...input, password: hashedPassword });

  const { password, ...user } = newUser.toObject();
  const token = createToken(user);

  return { user, token };
};

/**
 * @function login
 * @param {{email:string, password:string}} input - login input
 * @returns {{user:User, token:string}}             credentials
 */
const login = async input => {
  const findUser = await User.findOne({ email: input.email }).select('+password');
  if (!findUser) throw new HttpException(httpStatus.NOT_FOUND, 'User not found');

  const isPasswordMatching = await compare(input.password, findUser.password);
  if (!isPasswordMatching) throw new HttpException(httpStatus.UNAUTHORIZED, 'Wrong credentials');

  const { password, ...user } = findUser.toObject();
  const token = createToken(user);

  return { user, token };
};

export default { register, login };
