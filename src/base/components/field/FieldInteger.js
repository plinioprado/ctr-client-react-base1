import Form from 'react-bootstrap/Form';

const FieldInteger = ({
    accessSubmit,
    errorMessage,
    handleFieldChange,
    itemData,
    itemFormat
  }) => {

  return (<Form.Control
    style={{textAlign: 'right'}}
    disabled={!accessSubmit}
    type="text"
    defaultValue={itemData[itemFormat.name]}
    onChange={handleFieldChange}
    className={errorMessage && "border-danger"}
  />);
};

export default FieldInteger;
