import { object, string, mixed, number } from 'yup';

const email = string().email('Not valid email');
const password = string().min(6, 'Too short - should be 6 chars minimum');
const firstName = string().min(2, 'Too short - should be 2 chars minimum');
const lastName = string().min(2, 'Too short - should be 2 chars minimum');
const role = mixed().oneOf(['user', 'admin'], 'Invalid role value');

const updateUser = object().shape({
  params: object({
    id: string().required('User Id is required'),
  }),
  body: object({
    email,
    password,
    firstName,
    lastName,
    role,
  }),
});

const deleteUser = object().shape({
  params: object({
    id: string().required('User Id is required'),
  }),
});

const findUserById = object().shape({
  params: object({
    id: string().required('User Id is required'),
  }),
  query: object({
    role,
    latest: number().oneOf([0, 1]),
    page: number(),
    size: number(),
  }),
});

export default { updateUser, deleteUser, findUserById };
