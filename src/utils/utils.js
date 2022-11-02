import { sign } from 'jsonwebtoken';
import CryptoJS from 'crypto-js';

import { SECRET_KEY } from '@config';

/**
 * @function createToken
 * @param {import('@models/User').User} user
 * @param {string} expiresIn  7d
 * @returns {string}
 */
export const createToken = (user, expiresIn = '7d') => {
  const dataStoredInToken = {
    _id: user._id,
    role: user.role,
  };

  return sign(dataStoredInToken, SECRET_KEY, { expiresIn });
};

/**
 * @function hash
 * @param {string} text   - string that needs to be encripted
 * @returns {string}        encripted string
 */
export const hash = text => {
  const ciphertext = CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
  return ciphertext;
};

/**
 * @function compare
 * @param {string} text           - normal string
 * @param {string} encryptedText  - encrypted string
 * @returns {boolean}               boolean
 */
export const compare = (text, encryptedText) => {
  const bytes = CryptoJS.AES.decrypt(encryptedText, SECRET_KEY);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return text === originalText;
};
