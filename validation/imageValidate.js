const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateImageUpload = (data) => {
  let errors = {};

  data.label = !isEmpty(data.label) ? data.label : '';

  if (!Validator.isLength(data.label, { min: 3, max: 20 })) {
    errors.label = 'Label must be between 3 and 20 characters';
  }

  if (Validator.isEmpty(data.label)) {
    errors.label = 'Label field is required';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
