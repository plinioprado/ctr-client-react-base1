const validateText = (value, required) =>
  (required && value === '') ? 'required'
  : '';

export default validateText
