import Form from 'react-bootstrap/Form';

const FieldFilterText = ({
    name,
    value,
    onChange
  }) => {
   return(
    <Form.Control
      name={name}
      defaultValue={value}
      onChange={e => onChange(e.target.name, e.target.value)}
      type="text"
      key={name}
    />)
};

export default FieldFilterText;
