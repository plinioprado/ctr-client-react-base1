import { Col, Form } from "react-bootstrap";

const AccountFieldDc = ({ valueChange, fieldError, md, value }) => {
  const onChange = (e) => {
    const value = e.target.value.trim();
    valueChange("dc", value);
  };

  return (
    <Form.Group as={Col} md={md} controlId="dc" key="dc">
      <Form.Label>Db/Cr</Form.Label>
      <Form.Control
        as="select"
        name="dc"
        value={value}
        onChange={onChange}
        className={fieldError && "border-danger"}
        key="dc"
      >
        <option key="D" value="D">
          Db
        </option>
        <option key="C" value="C">
          Cr
        </option>
      </Form.Control>
      <Form.Text className="text-error">{fieldError}</Form.Text>
    </Form.Group>
  );
};

export default AccountFieldDc;
