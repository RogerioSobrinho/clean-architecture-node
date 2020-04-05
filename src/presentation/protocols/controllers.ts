import { HttpResponse, HttpRequest } from './http';

export interface Controller {
  handle (httpResquest: HttpRequest): HttpResponse
}
