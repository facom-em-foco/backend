import { Router } from 'express';
import PostController from '@/controllers/post.controller';
import multer from 'multer';
import { multerConfig, fileFilter } from '@/multer-config';

const {
  UPLOADS_PATH = './uploads',
  POST_FILE_NAME = '',
  POST_FILE_LIMIT = 5,
} = process.env;

const postController = new PostController();
const postRouter = Router();

const storage = multerConfig(`.${UPLOADS_PATH}`, POST_FILE_NAME);

const upload = multer({
  storage,
  limits: {
    fileSize: +POST_FILE_LIMIT * 1024 * 1024, // Megabytes
  },
  fileFilter,
});

postRouter.post(
  '/post',
  upload.single('image'),
  postController.createPost.bind(postController),
);
postRouter.get('/post', postController.getAllPosts.bind(postController));
postRouter.get('/post/:id', postController.getPostById.bind(postController));
postRouter.patch(
  '/post/:id',
  upload.single('image'),
  postController.editPostById.bind(postController),
);
postRouter.delete(
  '/post/:id',
  postController.deletePostById.bind(postController),
);

export default postRouter;
