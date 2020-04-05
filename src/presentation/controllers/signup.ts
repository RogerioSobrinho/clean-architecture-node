export class SignUpController {
  handle (httpResquest: any): any {
    const paramRequired = ['name', 'email', 'password', 'passwordConfirmation'];
    for (const param of paramRequired) {
      if (!httpResquest.body[param]) {
        return {
          statusCode: 400,
          body: new Error(`Missing param: ${param}`)
        };
      }
    }
  }
};
