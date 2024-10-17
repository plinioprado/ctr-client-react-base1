import { Col, Form } from "react-bootstrap";

const AccountFieldNum = ({ valueChange, errorMessage, md, value }) => {
  const onChange = (e) => {
    const value = e.target.value.trim();
    valueChange("num", value);
  };

  return (
    <Form.Group as={Col} md={md} controlId="num" key="num">
      <Form.Label>Number</Form.Label>
      <Form.Control
        className={errorMessage && "border-danger"}
        defaultValue={value}
        maxLength="30"
        onChange={onChange}
        type="text"
        key="num"
      />
      <Form.Text className="text-error">{errorMessage}</Form.Text>
    </Form.Group>
  );
};

export default AccountFieldNum;
