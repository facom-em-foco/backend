import { Request, Response } from 'express';
import { HttpRequest } from '@/commons/interfaces/http-request.interface';
import {
  helloWorldErrorService,
  helloWorldService,
} from '@/services/hello-world.service';

const helloWorld = async (req: Request, res: Response): Promise<void> => {
  const httpRequest: HttpRequest = {
    body: req.body,
    query: req.query,
    headers: req.headers,
  };

  const response = await helloWorldService(httpRequest);

  res.status(response.status);
  res.header(response.headers);
  res.send(response.data);
};

const helloWorldError = async (req: Request, res: Response): Promise<void> => {
  const httpRequest: HttpRequest = {
    body: req.body,
    query: req.query,
    headers: req.headers,
  };

  const response = await helloWorldErrorService(httpRequest);

  res.status(response.status);
  res.header(response.headers);
  res.send(response.data);
};

export const HelloWorldController = {
  helloWorld,
  helloWorldError,
};
