import { Request, Response, NextFunction } from 'express';

export const checkAccessToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const publicRoutes = ['/login'];

  if (publicRoutes.includes(req.path)) {
    return next();
  }

  const authHeader = req.headers.authorization || '';

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    // return res
    //   .status(401)
    //   .json({ message: 'Access token não informado ou inválido!' });
  }

  const token = authHeader.split(' ')[1];

  if (!token) {
    // return res.status(401).json({ message: 'Token inválido!' });
  }

  res.locals.user = 'admin@example.com';

  next();
};
