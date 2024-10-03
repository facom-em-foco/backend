export type HttpRequest<
  BodyT = any,
  HeadersT = any,
  QueryT = any,
  ParamsT = any,
  MethodT = any,
  FileT = any,
> = {
  body: BodyT;
  headers?: HeadersT;
  query?: QueryT;
  params?: ParamsT;
  method?: MethodT;
  file?: FileT;
};
