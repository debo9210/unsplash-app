const Validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = validateImageUpload = (data) => {
  let errors = {};

  data.label = !isEmpty(data.label) ? data.label : '';
  data.photoUrl = !isEmpty(data.photoUrl) ? data.photoUrl : '';

  if (!Validator.isLength(data.label, { min: 3, max: 20 })) {
    errors.label = 'Label must be between 3 and 20 characters';
  }

  if (Validator.isEmpty(data.label)) {
    errors.label = 'Label field is required';
  }

  if (Validator.isEmpty(data.photoUrl)) {
    errors.photoUrl = 'Please provide an image url';
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
