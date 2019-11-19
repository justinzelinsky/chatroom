import validateRegisterInput from '../../../src/server/validation/register';

describe('validateRegisterInput test', () => {
  it('should return not errors when using a valid name, email and password', () => {
    const { errors, isValid } = validateRegisterInput({
      name: 'Justin Zelinsky',
      email: 'justin@zelinsky.com',
      password: 'helloWorld',
      password2: 'helloWorld'
    });

    expect(errors).toEqual({});
    expect(isValid).toEqual(true);
  });

  it('should return an error when missing a name', () => {
    const { errors, isValid } = validateRegisterInput({});

    expect(errors.name).toEqual('Name field is required');
    expect(isValid).toEqual(false);
  });

  it('should return an error when missing a email', () => {
    const { errors, isValid } = validateRegisterInput({});

    expect(errors.email).toEqual('Email field is required');
    expect(isValid).toEqual(false);
  });

  it('should return an error when using an invalid email', () => {
    const { errors, isValid } = validateRegisterInput({ email: 'hello' });

    expect(errors.email).toEqual('Email is invalid');
    expect(isValid).toEqual(false);
  });

  it('should return an error when missing a password', () => {
    const { errors, isValid } = validateRegisterInput({});

    expect(errors.password).toEqual('Password field is required');
    expect(isValid).toEqual(false);
  });

  it('should return an error when missing a confirm password', () => {
    const { errors, isValid } = validateRegisterInput({});

    expect(errors.password2).toEqual('Confirm password field is required');
    expect(isValid).toEqual(false);
  });

  it('should return an error when password length requirements are not met', () => {
    const { errors, isValid } = validateRegisterInput({
      password: 'hi',
      password2: 'hi'
    });

    expect(errors.password).toEqual(
      'Password must be between 6 and 30 characters'
    );
    expect(isValid).toEqual(false);
  });

  it('should return an error when passwords do not match', () => {
    const { errors, isValid } = validateRegisterInput({
      password: 'helloWorld',
      password2: 'greetingsPlanet'
    });

    expect(errors.password2).toEqual('Passwords must match');
    expect(isValid).toEqual(false);
  });
});
