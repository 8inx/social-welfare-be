import { Router } from 'express';

import authController from '@controllers/auth.controller';
import authValidation from '@validations/auth.validation';
import validate from '@middlewares/validate';

const router = Router();

router.post('/register', validate(authValidation.register), authController.register);
router.post('/login', validate(authValidation.login), authController.login);

export default router;
