const validateEmail = (value, required) =>
 (required && value === '') ? 'required'
  : (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) ? 'invalid'
  : '';

export default validateEmail;
