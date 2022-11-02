import httpStatus from 'http-status';

import HttpException from '@exceptions/HttpException';
import User from '@models/User';
import { hash } from '@utils/utils';

/**
 * @function updateUser
 * @param {string} userId           - id of user to be updated
 * @param {string} requesterRole    - role of current user
 * @param {object} input            - updated request body
 * @returns {User}                    updated User
 */

const updateUser = async (userId, requesterRole, input) => {
  const { email, password, role } = input;

  if (email) {
    const findOne = await User.findOne({ email });
    if (findOne && userId !== findOne._id.toString())
      throw new HttpException(httpStatus.CONFLICT, 'Email is already taken');
  }

  if (password) {
    const hashedPassword = hash(input.password);
    input.password = hashedPassword;
  }

  if (role) {
    const findById = await User.findById(userId).lean();
    const isNotAdmin = requesterRole !== 'admin';
    const isGoingToChangeRole = role !== findById.role;

    if (isNotAdmin && isGoingToChangeRole) {
      throw new HttpException(httpStatus.FORBIDDEN, 'Only admins can update role');
    }
  }

  const updateUserById = await User.findByIdAndUpdate(userId, { $set: input }, { new: true });
  return updateUserById;
};

/**
 * @function deleteUser
 * @param {string} userId     - id of user to be deleted
 * @returns {User}              deleted User
 */
const deleteUser = async userId => {
  const findByIdAndDelete = await User.findByIdAndDelete(userId);
  return findByIdAndDelete;
};

/**
 * @function findUserById
 * @param {string} userId     - id of user that will be get
 * @returns {User}              User
 */
const findUserById = async userId => {
  const findUser = await User.findById(userId).lean();
  return findUser;
};

/**
 * @function findAllUsers
 * @param {number} [query.page=1]     - current page
 * @param {number} [query.size=30]    - size per page
 * @param {string} [query.role]       - filter role
 * @param {string} [query.lates]      - sort latest
 * @returns {[User]}                    List Users
 */
const findAllUsers = async query => {
  const { size = 30, page = 1, role, latest } = query;
  const limit = size;
  const skip = Math.abs(page - 1) * limit;
  const filter = {
    ...(role ? { role } : {}),
  };

  console.log(latest);
  const sort = parseInt(latest) ? { createdAt: -1 } : {};

  const findUsers = await User.find(filter).sort(sort).skip(skip).limit(limit);
  return findUsers;
};

export default { updateUser, deleteUser, findUserById, findAllUsers };
