import { HttpRequest, HttpResponse } from '../protocols/http';
import { MissingParamError } from '../erros/missing-param-error';
import { badRequester } from '../helpers/http-helpers';
import { Controller } from '../protocols/controllers';
import { EmailValidator } from '../protocols/email-validator';
import { InvalidParam } from '../erros/invalid-param-error';

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator;

  constructor(emailValidator: EmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpResquest: HttpRequest): HttpResponse {
    const paramRequired = ['name', 'email', 'password', 'passwordConfirmation'];
    for (const param of paramRequired) {
      if (!httpResquest.body[param]) {
        return badRequester(new MissingParamError(param));
      }
    }
    const { email, password, passwordConfirmation } = httpResquest.body;
    if (!this.emailValidator.isValid(email)) {
      return badRequester(new InvalidParam('email'));
    }

    if (!password !== passwordConfirmation) {
      return badRequester(new InvalidParam('passwordConfirmation'));
    }
  }
};
