import Form from 'react-bootstrap/Form';

const FieldBoolean = ({
    itemData,
    itemFormat,
    accessSubmit,
    handleFieldChange,
    errorMessage
  }) => {
  return (<Form.Control
    as="select"
    disabled={!accessSubmit}
    value={itemData[itemFormat.name]}
    onChange={handleFieldChange}
    className={errorMessage && "border-danger"}
  >
    <option value="true">Yes</option>
    <option value="false">No</option>
  </Form.Control>)
}

export default FieldBoolean;
