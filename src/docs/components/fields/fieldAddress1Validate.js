const validateAddress1Line3 = (value, message) =>
  (value.line3 === '') ? message
  : '';

const validateAddress1Country = (value, message) =>
  (value.country_cod === '') ? message
  : '';


export {
  validateAddress1Line3,
  validateAddress1Country
}
