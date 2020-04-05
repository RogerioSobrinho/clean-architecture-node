import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../erros/missing-param-error';
import { badRequester } from '../helpers/http-helpers';
import { Controller } from '../protocols/controllers';

export class SignUpController implements Controller {
  handle (httpResquest: HttpRequest): HttpResponse {
    const paramRequired = ['name', 'email', 'password', 'passwordConfirmation'];
    for (const param of paramRequired) {
      if (!httpResquest.body[param]) {
        return badRequester(new MissingParamError(param));
      }
    }
  }
};
