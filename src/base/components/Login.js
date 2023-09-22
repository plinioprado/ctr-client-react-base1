import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Form, Button } from 'react-bootstrap';

import { BaseContext } from "../BaseContext";

function Login() {

  const { login } = useContext(BaseContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const logged = await login(fields.email.value, fields.pass.value);
    if (logged) navigate('/');
  };

  const initialFields = {
    'email': {
      validateOnChange: (value) => (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value) ? '' : 'invalid email'),
      validateMessage: '',
      value: ''
    },
    'pass': {
      validateOnChange: (value) => (value.length  >= 5 ? '' : 'less than 5 characters' ),
      validateMessage: '',
      value: ''
    }
  };

  const [fields, setFields] = useState(initialFields);

  const handleChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    const validateMessage = fields[id].validateOnChange(value)

    setFields({
      ...fields,
      [id]: {
        ...fields[id],
        value: value,
        validateMessage: validateMessage
      }
    })
  };

  return (
    <main className="login">
      <Container className='login'>
        <Form>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label><h2>Login</h2></Form.Label>
            <Form.Control
              type="email"
              placeholder="Email Address"
              autoComplete="email"
              onChange={handleChange}
              className={fields.email.validateMessage && "border-danger"}
            />
            <Form.Text className="text-error">{fields.email.validateMessage}</Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="pass">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              autoComplete='current-password'
              onChange={handleChange}
              className={fields.pass.validateMessage && "border-danger"}
              />
            <Form.Text className="text-error">{fields.pass.validateMessage}</Form.Text>
          </Form.Group>

          <Button
            variant="primary"
            type="submit"
            className="float-end"
            onClick={handleSubmit}
            disabled={fields.email.validateMessage !== '' || fields.pass.validateMessage !== ''}
          >
          Submit
        </Button>
      </Form>
    </Container>
  </main>
  )
}

export default Login;
