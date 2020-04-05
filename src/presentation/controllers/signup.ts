import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../erros/missing-param-error';

export class SignUpController {
  handle (httpResquest: HttpRequest): HttpResponse {
    const paramRequired = ['name', 'email', 'password', 'passwordConfirmation'];
    for (const param of paramRequired) {
      if (!httpResquest.body[param]) {
        return {
          statusCode: 400,
          body: new MissingParamError(param)
        };
      }
    }
  }
};
