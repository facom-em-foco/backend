import { Router } from 'express';
import HelloWorldController from '@/controllers/hello-world.controller';

const helloWorldController = new HelloWorldController();
const helloWorldRouter = Router();

helloWorldRouter.get(
  '/',
  helloWorldController.helloWorld.bind(helloWorldController),
);
helloWorldRouter.get(
  '/error',
  helloWorldController.helloWorldError.bind(helloWorldController),
);

export default helloWorldRouter;
