import { Router } from 'express';
import UserController from '@/controllers/user.controller';

const authController = new UserController();
const authRouter = Router();

authRouter.post('/login', authController.getUserById.bind(authController));

export default authRouter;
