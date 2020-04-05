import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../erros/missing-param-error';
import { badRequester } from '../helpers/http-helpers';

export class SignUpController {
  handle (httpResquest: HttpRequest): HttpResponse {
    const paramRequired = ['name', 'email', 'password', 'passwordConfirmation'];
    for (const param of paramRequired) {
      if (!httpResquest.body[param]) {
        return badRequester(new MissingParamError(param));
      }
    }
  }
};
