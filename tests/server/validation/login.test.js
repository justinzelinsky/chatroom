import validateLoginInput from 'server/validation/login';

describe('validateLoginInput test', () => {
  it('should return not errors when using a valid email and password', () => {
    const { errors, isValid } = validateLoginInput({
      email: 'justin@zelinsky.com',
      password: 'helloWorld'
    });

    expect(errors).toEqual({});
    expect(isValid).toEqual(true);
  });

  it('should return an error when missing an email', () => {
    const { errors, isValid } = validateLoginInput({});

    expect(errors.email).toEqual('Email field is required');
    expect(isValid).toEqual(false);
  });

  it('should return an error when using an invalid email', () => {
    const { errors, isValid } = validateLoginInput({ email: 'hello' });

    expect(errors.email).toEqual('Email is invalid');
    expect(isValid).toEqual(false);
  });

  it('should return an error when missing a password', () => {
    const { errors, isValid } = validateLoginInput({});

    expect(errors.password).toEqual('Password field is required');
    expect(isValid).toEqual(false);
  });
});
