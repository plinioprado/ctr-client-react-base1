import { Col, Form } from "react-bootstrap";

const AccountFieldName = ({ valueChange, errorMessage, md, value }) => {
  const onChange = (e) => {
    const value = e.target.value.trim();
    valueChange("name", value);
  };

  return (
    <Form.Group as={Col} md={md} controlId="name" key="name">
      <Form.Label>Name</Form.Label>
      <Form.Control
        className={errorMessage && "border-danger"}
        defaultValue={value}
        maxLength="100"
        onChange={onChange}
        type="text"
        key="name"
      />
      <Form.Text className="text-error">{errorMessage}</Form.Text>
    </Form.Group>
  );
};

export default AccountFieldName;
