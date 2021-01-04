const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateImageUpload = (data) => {
  let errors = {};

  data.label = !isEmpty(data.label) ? data.label : '';
  data.imageLink = !isEmpty(data.imageLink) ? data.imageLink : '';

  if (!Validator.isLength(data.label, { min: 3, max: 20 })) {
    errors.label = 'Label must be between 3 and 20 characters';
  }

  if (Validator.isEmpty(data.label)) {
    errors.label = 'Label field is required';
  }

  if (Validator.isEmpty(data.imageLink)) {
    errors.imageLink = 'Please provide an image url';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
