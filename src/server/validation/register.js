const { isEmail, isEmpty, isLength } = require('utils');

const validateRegisterInput = ({
  name = '',
  email = '',
  password = '',
  passwordConfirmation = ''
}) => {
  const errors = {};

  if (!name) {
    errors.name = 'Name field is required';
  }

  if (!email) {
    errors.email = 'Email field is required';
  } else if (!isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (!password) {
    errors.password = 'Password field is required';
  } else if (!isLength(password, { min: 6, max: 30 })) {
    errors.password = 'Password must be between 6 and 30 characters';
  }

  if (!passwordConfirmation) {
    errors.passwordConfirmation = 'Confirm password field is required';
  } else if (password !== passwordConfirmation) {
    errors.passwordConfirmation = 'Passwords must match';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateRegisterInput;
