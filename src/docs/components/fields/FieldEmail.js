import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import validateEmail from './fieldEmailValidate';

const FieldEmail = ({
  fieldChangeValue,
  fieldDisabled,
  fieldLabel,
  fieldMd,
  fieldName,
  fieldRequired,
  fieldValue,
}) => {

  const errorMessage = validateEmail(fieldValue, fieldRequired);

  const onChange = (e) => {
    const value = e.target.value.trim()
    fieldChangeValue(fieldName, value);
  };

  return (
    <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName}>
        <Form.Label>{fieldLabel}</Form.Label>
        <Form.Control
          className={errorMessage && "border-danger"}
          defaultValue={fieldValue}
          disabled={fieldDisabled}
          maxLength={60}
          onChange={onChange}
          type="text"
        />
        <Form.Text className="text-error">{errorMessage}</Form.Text>
    </Form.Group>
    );
};

export default FieldEmail;
