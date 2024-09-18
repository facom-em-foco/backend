import { Router } from 'express';
import PostController from '@/controllers/post.controller';

const postController = new PostController();
const postRouter = Router();

postRouter.post('/post', postController.createPost.bind(postController));
postRouter.get('/post', postController.getAllPosts.bind(postController));
postRouter.get('/post/:id', postController.getPostById.bind(postController));
postRouter.patch('/post/:id', postController.editPostById.bind(postController));
postRouter.delete(
  '/post/:id',
  postController.deletePostById.bind(postController),
);

export default postRouter;
