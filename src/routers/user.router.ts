import { Router } from "express";
import UserController from "@/controllers/user.controlller";


const userController = new UserController();
const userRouter = Router();

userRouter.get('/user/:id', userController.getUserById.bind(userController));

export default userRouter;