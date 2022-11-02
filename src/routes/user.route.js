import { Router } from 'express';

import userController from '@controllers/user.controller';
import userValidation from '@validations/user.validation';
import permissions from '@middlewares/permissions';
import validate from '@middlewares/validate';

const router = Router();

router.put('/:id', validate(userValidation.updateUser), permissions.verifyAuthorization, userController.updateUser);
router.delete('/:id', validate(userValidation.deleteUser), permissions.verifyAdmin, userController.deleteUser);
router.get('/:id', validate(userValidation.findUserById), permissions.verifyAuthorization, userController.findUserById);
router.get('/', permissions.verifyAdmin, userController.findAllUsers);
export default router;
