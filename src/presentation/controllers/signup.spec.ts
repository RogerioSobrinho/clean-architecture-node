import { SignUpController } from './signup';
import { MissingParamError } from '../erros/missing-param-error';
import { InvalidParam } from '../erros/invalid-param-error';
import { EmailValidator } from '../protocols/email-validator';

describe('SignUp Controller', () => {
  interface sutTypes {
    sut: SignUpController
    emailValidator: EmailValidator
  }

  const makeSut = (): sutTypes => {
    class EmailValidator implements EmailValidator {
      isValid = (email: string): boolean => true;
    }
    const emailValidator = new EmailValidator();
    const sut = new SignUpController(emailValidator);
    return {
      sut,
      emailValidator
    };
  };
  it('should return 400 if no name is provider', () => {
    const { sut } = makeSut();
    const httpResquest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpResquest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('name'));
  });

  it('should return 400 if no email is provider', () => {
    const { sut } = makeSut();
    const httpResquest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpResquest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('email'));
  });

  it('should return 400 if no password is provider', () => {
    const { sut } = makeSut();
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpResquest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('password'));
  });

  it('should return 400 if no passwordConfirmation is provider', () => {
    const { sut } = makeSut();
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpResquest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new MissingParamError('passwordConfirmation'));
  });

  it('should return 400 if invalid email is provider', () => {
    const { sut, emailValidator } = makeSut();
    jest.spyOn(emailValidator, 'isValid').mockImplementationOnce(() => false);
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpResquest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParam('email'));
  });

  it('should return 400 if invalid password confirmation is provider', () => {
    const { sut } = makeSut();
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'invalid_email@email.com',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpResquest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new InvalidParam('passwordConfirmation'));
  });
});
