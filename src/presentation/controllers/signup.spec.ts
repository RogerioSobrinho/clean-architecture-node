import { SignUpController } from './signup';

describe('SignUp Controller', () => {
  it('should return 400 if no name is provider', () => {
    const sut = new SignUpController();
    const httpResquest = {
      body: {
        name: 'any_name',
        email: 'any_email',
        password: 'any_password',
        passwordConfirmation: 'any_password'
      }
    };
    const httpResponse = sut.handle(httpResquest);
    expect(httpResponse.statusCode).toBe(400);
  });
});
