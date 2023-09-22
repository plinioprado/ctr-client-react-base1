import Form from 'react-bootstrap/Form';

const FieldText = ({
  itemData,
  itemFormat,
  accessSubmit,
  handleFieldChange,
  errorMessage
}) => {
  return <Form.Control
    disabled={itemFormat.readonly || (!itemData.opNew && itemFormat.primaryKey) || !accessSubmit}
    type="text"
    maxLength={itemFormat.maxlenght || 60}
    defaultValue={itemData[itemFormat.name]}
    onChange={handleFieldChange}
    className={errorMessage && "border-danger"}
  />
};

export default FieldText;
