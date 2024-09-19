import { Router } from 'express';
import UserController from '@/controllers/user.controller';

const userController = new UserController();
const userRouter = Router();

userRouter.get('/user/:id', userController.getUserById.bind(userController));

export default userRouter;
