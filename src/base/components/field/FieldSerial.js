import Form from 'react-bootstrap/Form';

const FieldSerial = ({
    itemData,
    itemFormat,
    handleFieldChange,
    errorMessage
  }) => {
  return (<Form.Control
    disabled
    type="text"
    defaultValue={itemData.opNew ? 'Serial' : itemData[itemFormat.name]}
    onChange={handleFieldChange}
    className={errorMessage && "border-danger"}
  />);
};

export default FieldSerial;
