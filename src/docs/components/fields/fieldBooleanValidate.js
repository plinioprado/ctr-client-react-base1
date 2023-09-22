const validateBoolean = (value) => ![true, false].includes(value)  ? 'invalid'
    : '';

export default validateBoolean;
