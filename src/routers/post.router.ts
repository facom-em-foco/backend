import { Router } from 'express';
import PostController from '@/controllers/post.controller';

const postController = new PostController();
const postRouter = Router();

postRouter.get('/post/:id', postController.getPostById.bind(postController));
postRouter.get('/post', postController.getAllPosts.bind(postController));

export default postRouter;
