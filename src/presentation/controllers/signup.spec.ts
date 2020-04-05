import { SignUpController } from './signup';

describe('SignUp Controller', () => {
  it('should return 400 if no name is provider', () => {
    const sut = new SignUpController();
    const httpResquest = {
      body: {
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpResquest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: name'));
  });

  it('should return 400 if no email is provider', () => {
    const sut = new SignUpController();
    const httpResquest = {
      body: {
        name: 'any_name',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpResquest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: email'));
  });

  it('should return 400 if no password is provider', () => {
    const sut = new SignUpController();
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpResquest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: password'));
  });

  it('should return 400 if no password is provider', () => {
    const sut = new SignUpController();
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpResquest);
    expect(httpResponse.statusCode).toBe(400);
    expect(httpResponse.body).toEqual(new Error('Missing param: passwordConfirmation'));
  });
});
