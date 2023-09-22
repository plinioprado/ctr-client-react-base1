const validateSelect = (value, required, options) =>
  (required && value === '') ? 'required'
  : (options.filter(it => it.value === value).length !== 1) ? 'invalid'
  : '';

export default validateSelect;
