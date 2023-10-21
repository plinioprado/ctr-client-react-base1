import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

const FieldEmail = ({
  fieldChangeValue,
  fieldDisabled,
  fieldError,
  fieldLabel,
  fieldMd,
  fieldName,
  fieldValue,
}) => {

  const onChange = (e) => {
    const value = e.target.value.trim()
    fieldChangeValue(fieldName, value);
  };

  return (
    <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName}>
        <Form.Label>{fieldLabel}</Form.Label>
        <Form.Control
          className={fieldError && "border-danger"}
          defaultValue={fieldValue}
          disabled={fieldDisabled}
          maxLength={60}
          onChange={onChange}
          type="text"
        />
        <Form.Text className="text-error">{fieldError}</Form.Text>
    </Form.Group>
    );
};

export default FieldEmail;
