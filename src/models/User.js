import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      select: false,
      required: true,
    },
    firstName: {
      type: String,
      min: 2,
      required: true,
    },
    lastName: {
      type: String,
      min: 2,
      required: true,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);

/**
 * Promisified Mongoose model for user document.
 *
 * @typedef User
 * @property {string} _id
 * @property {string} email
 * @property {string} password
 * @property {string} firstName
 * @property {string} lastName
 * @property {'user'|'admin'} role
 */

export default User;
