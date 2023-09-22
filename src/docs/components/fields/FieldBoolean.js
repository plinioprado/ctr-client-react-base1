import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import validateBoolean from './fieldBooleanValidate'

const FieldBoolean = ({
    fieldChangeValue,
    fieldDisabled,
    fieldLabel,
    fieldMd,
    fieldName,
    fieldValue
  }) => {

  const errorMessage = validateBoolean(fieldValue);

  const onChange = (e) => {
    const value = (e.target.value === 'true')
    fieldChangeValue(fieldName, value)
  }

  return (
    <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName}>
      <Form.Label>{fieldLabel}</Form.Label>
      <Form.Control
        as="select"
        className={errorMessage && "border-danger"}
        disabled={fieldDisabled}
        value={fieldValue}
        onChange={onChange}
      >
      <option value="true">Yes</option>
      <option value="false">No</option>
    </Form.Control>
    <Form.Text className="text-error">{errorMessage}</Form.Text>
  </Form.Group>
  );
}

export default FieldBoolean;
