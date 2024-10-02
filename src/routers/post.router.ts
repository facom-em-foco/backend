import { Router } from 'express';
import PostController from '@/controllers/post.controller';
import multer from 'multer';
import { multerConfig } from '@/multer-config';

const { POST_IMAGE_PATH = '' } = process.env;

const postController = new PostController();
const postRouter = Router();

const storage = multerConfig(POST_IMAGE_PATH, 'post_img');

const upload = multer({ storage });

postRouter.post(
  '/post',
  upload.single('imagePath'),
  postController.createPost.bind(postController),
);
postRouter.get('/post', postController.getAllPosts.bind(postController));
postRouter.get('/post/:id', postController.getPostById.bind(postController));
postRouter.patch('/post/:id', postController.editPostById.bind(postController));
postRouter.delete(
  '/post/:id',
  postController.deletePostById.bind(postController),
);

export default postRouter;
