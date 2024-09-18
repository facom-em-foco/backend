import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helloWorldRouter from './routers/hello-world.router';
import postRouter from './routers/post.router';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(helloWorldRouter);
app.use(postRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});

export default app;
