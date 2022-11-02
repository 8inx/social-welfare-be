import userService from '@services/user.service';

const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { role } = req.user;
    const findByIdAndUpdate = await userService.updateUser(id, role, req.body);
    res.status(200).json({ data: findByIdAndUpdate, message: 'Updated successfully' });
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findByIdAndDelete = await userService.deleteUser(id, req.body);
    res.status(200).json({ data: findByIdAndDelete, message: 'Deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const findUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const findUser = await userService.findUserById(id, req.body);
    res.status(200).json({ data: findUser, message: 'Find user' });
  } catch (error) {
    next(error);
  }
};

const findAllUsers = async (req, res, next) => {
  try {
    const find = await userService.findAllUsers(req.query);
    res.status(200).json({ data: find, message: 'List Users' });
  } catch (error) {
    next(error);
  }
};

export default { updateUser, deleteUser, findUserById, findAllUsers };
