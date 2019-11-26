const { isEmpty, isEmail } = require('utils');

const validateUpdateInput = ({ email = '', name = '' }) => {
  const errors = {};

  if (!email) {
    errors.email = 'Email field is required';
  } else if (!isEmail(email)) {
    errors.email = 'Email is invalid';
  }

  if (!name) {
    errors.name = 'Name field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateUpdateInput;
