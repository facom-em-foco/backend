import { Router } from 'express';
import { HelloWorldController } from '@/controllers/hello-world.controller';

const helloWorldRouter = Router();

helloWorldRouter.get('/', HelloWorldController.helloWorld);
helloWorldRouter.get('/error', HelloWorldController.helloWorldError);

export default helloWorldRouter;
