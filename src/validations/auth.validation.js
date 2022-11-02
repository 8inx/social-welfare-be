import { object, string } from 'yup';

export const email = string().email('Not valid email').required('Email is required!');
export const password = string().min(6, 'Too short - should be 6 chars minimum').required('Password is required');
export const firstName = string().min(2, 'Too short - should be 2 chars minimum').required('First name is required');
export const lastName = string().min(2, 'Too short - should be 2 chars minimum').required('Last name is required');

const register = object().shape({
  body: object({
    email,
    password,
    firstName,
    lastName,
  })
    .noUnknown(true)
    .strict(),
});

const login = object().shape({
  body: object({
    email,
    password,
  }),
});

export default { register, login };
