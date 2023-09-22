import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const FieldKeySerial = ({
    fieldLabel,
    fieldMd,
    fieldName,
    fieldValue,
    fieldOpNew
  }) => {

  return (
    <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName}>
      <Form.Label>{fieldLabel}</Form.Label>
      <Form.Control
        disabled
        type="text"
        defaultValue={fieldOpNew ? 'Serial' : fieldValue}
        className="form-control"
      />
    </Form.Group>
    );
};

export default FieldKeySerial;
