import { Col, Form } from 'react-bootstrap';

const ReportFieldDate = ({
    fieldChangeValue,
    fieldLabel,
    fieldName,
    fieldPlaceHolder,
    fieldValue
  }) => {

  const onChange = (e) => {
    const value = e.target.value.trim()
    fieldChangeValue(fieldName, value);
  };

  return (
  <Form.Group as={Col} controlId={fieldName} key={fieldName}>
    <Form.Label>{fieldLabel}</Form.Label>
    <Form.Control
      defaultValue={fieldValue}
      maxLength="10"
      onChange={onChange}
      placeholder={fieldPlaceHolder}
      type="text"
      key={fieldName}
    />
  </Form.Group>
  );
};

export default ReportFieldDate;
