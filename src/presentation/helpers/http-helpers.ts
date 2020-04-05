import { HttpResponse } from '../protocols/http';

export const badRequester = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
});
