const validateValue = (value, required) =>
  (typeof value.amount !== 'number') ? 'not numeric'
  : (required && value.amount === 0) ? 'required'
  : '';

export default validateValue
