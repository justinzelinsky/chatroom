const { isEmpty, isEmail } = require('utils');

const validateLoginInput = ({ email = '', password = '' }) => {
  const errors = {};

  if (!email) {
    errors.email = 'Email field is required';
  } else if (!isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (!password) {
    errors.password = 'Password field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateLoginInput;
