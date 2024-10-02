import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import helloWorldRouter from './routers/hello-world.router';
import postRouter from './routers/post.router';
import userRouter from './routers/user.router';
import tagRouter from './routers/tag.router';
import authRouter from './routers/auth.router';
import { AppDataSource } from './data-source';
import { checkAccessToken } from './helpers/middlewares-helper';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middlewares
app.use(checkAccessToken);

// Routers
app.use(helloWorldRouter);
app.use(authRouter);
app.use(postRouter);
app.use(tagRouter);
app.use(userRouter);

(async () => {
  const initPostgres = async () => {
    await AppDataSource.initialize();
    console.log('\x1b[34m%s\x1b[0m', '=> ✅ Postgres connected!');
  };

  try {
    // Database connection initialized
    await initPostgres();

    // Server Running
    app.listen(PORT, () => {
      console.log(
        '\x1b[33m%s\x1b[0m',
        `=> 🚀 Server running on the port: ${PORT}`,
      );
    });
  } catch (error) {
    console.log('\x1b[31m%s\x1b[0m', `=> ❌  Server error: ${error}`);
  }
})();

export default app;
