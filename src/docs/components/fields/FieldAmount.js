import { Form } from 'react-bootstrap';
import Col from 'react-bootstrap/Col';

import validate from './fieldAmountValidate';

const FieldValue = ({
  fieldChangeValue,
    fieldDisabled,
    fieldLabel,
    fieldMd,
    fieldName,
    fieldRequired,
    fieldValue
  }) => {

  const errorMessage = validate(fieldValue, fieldRequired);
  const maxLenght = 20

  const onChange = (e) => {
    const value = e.target.value.trim()
    fieldChangeValue(fieldName, value);
  };

  const defaultValue = (fieldValue.amount/100).toFixed(2);

  return (
    <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName} >
      <Form.Label>{fieldLabel}</Form.Label>
      <Form.Control
        style={{textAlign: 'right'}}
        className={errorMessage && 'border-danger'}
        defaultValue={defaultValue}
        disabled={fieldDisabled}
        maxLength={maxLenght}
        onChange={onChange}
        type="text"
      />
      <Form.Text className="text-error">{errorMessage}</Form.Text>
    </Form.Group>
    );
};

export default FieldValue;
