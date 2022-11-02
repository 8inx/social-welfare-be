import authService from '@services/auth.service';

const register = async (req, res, next) => {
  try {
    const registerUser = await authService.register(req.body);
    res.status(200).json({ data: registerUser, message: 'Register success' });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const loginUser = await authService.login(req.body);
    res.status(200).json({ data: loginUser, message: 'Login success' });
  } catch (error) {
    next(error);
  }
};

export default { register, login };
