import Form from 'react-bootstrap/Form';

const FieldPassword = ({
  itemData,
  itemFormat,
  accessSubmit,
  handleFieldChange,
  errorMessage
}) => {
  return (<Form.Control
      disabled={itemFormat.readonly || !accessSubmit}
      type="password"
      maxLength={itemFormat.maxlenght || 60}
      defaultValue={itemData[itemFormat.name]}
      onChange={handleFieldChange}
      className={errorMessage && "border-danger"}
      autoComplete="current-password"
    />);
};

export default FieldPassword;