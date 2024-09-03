import { Request } from 'express';
import { HttpRequest } from '@/interfaces/types/http-request.type';

export const httpRequestHelper = (req: Request): HttpRequest => {
  const httpRequest: HttpRequest = {
    body: req.body,
    query: req.query,
    headers: req.headers,
    params: req.params,
    method: req.method,
  };

  return httpRequest;
};
