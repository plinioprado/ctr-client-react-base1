import Form from 'react-bootstrap/Form';

const FieldSelect = ({
  itemData,
  itemFormat,
  accessSubmit,
  handleFieldChange,
  errorMessage
  }) => {
   return(
    <Form.Control
      as="select"
      disabled={!accessSubmit}
      value={itemData[itemFormat.name]}
      onChange={handleFieldChange}
      className={errorMessage && "border-danger"}
    >
      {
        itemFormat.options &&
        itemFormat.options
          .map(op => (<option key={op.value} value={op.value}>{op.text}</option>))
      }
    </Form.Control>);
};

export default FieldSelect;
