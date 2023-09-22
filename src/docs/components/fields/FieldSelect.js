import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import validateSelect from './fieldSelectValidate';

const FieldSelect = ({
    fieldChangeValue,
    fieldDisabled,
    fieldLabel,
    fieldMd,
    fieldName,
    fieldOptions,
    fieldRequired,
    fieldValue
  }) => {

    const ErrorMessage = validateSelect(fieldValue, fieldRequired, fieldOptions);

  const onChange = (e) => {
    const value = e.target.value.trim();
    fieldChangeValue(fieldName, value);
  }

   return(
    <Form.Group as={Col} md={fieldMd} controlId={fieldName} key={fieldName}>
      <Form.Label>{fieldLabel}</Form.Label>
      <Form.Control
        as="select"
        disabled={fieldDisabled}
        value={fieldValue}
        onChange={onChange}
        className={ErrorMessage && "border-danger"}
      >
        <option key="empty" value=""></option>
        {
          fieldOptions && fieldOptions
            .map(op => (<option key={op.value} value={op.value}>{op.text}</option>))
        }
      </Form.Control>
      <Form.Text className="text-error">{ErrorMessage}</Form.Text>
    </Form.Group>
    );
};

export default FieldSelect;
