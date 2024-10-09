import { useContext } from 'react';
import { useNavigate } from "react-router-dom";
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Alert from 'react-bootstrap/Alert';

import { BaseContext } from "../BaseContext";

function Header() {

  const { session, alertHide } = useContext(BaseContext);

  const navigate = useNavigate();

  const handleMenu = e => {
    navigate(e.target.getAttribute('to'));
  }

  return (
    <header>
    <Navbar expand="md" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="#" to="/" onClick={handleMenu}>CTR App</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {
                <>
                  <NavDropdown title="Reports" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#" to="/report/chart_accounts" onClick={handleMenu}>Chart of accounts</NavDropdown.Item>
                    <NavDropdown.Item href="#" to="/report/journal" onClick={handleMenu}>Journal</NavDropdown.Item>
                    <NavDropdown.Item href="#" to="/report/general_ledger" onClick={handleMenu}>General ledger</NavDropdown.Item>
                    <NavDropdown.Item href="#" to="/report/trial_balance" onClick={handleMenu}>Trial Balance</NavDropdown.Item>
                  </NavDropdown>
                  <NavDropdown title="Admin" id="basic-nav-dropdown">
                    <NavDropdown.Item href="#" to="/role" onClick={handleMenu}>Role</NavDropdown.Item>
                    <NavDropdown.Item href="#" to="/tenant" onClick={handleMenu}>Tenant</NavDropdown.Item>
                    <NavDropdown.Item href="#" to="/setting" onClick={handleMenu}>Setting</NavDropdown.Item>
                    <NavDropdown.Item href="#" to="/user" onClick={handleMenu}>User</NavDropdown.Item>
                    <NavDropdown.Item href="#" to="/country" onClick={handleMenu}>Country</NavDropdown.Item>
                    <NavDropdown.Item href="#" to="/currency" onClick={handleMenu}>Currency</NavDropdown.Item>
                    <NavDropdown.Item href="#" to="/session" onClick={handleMenu}>Session</NavDropdown.Item>
                  </NavDropdown>
                </>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
  </Navbar>
  {
    session.alert && session.alert.message &&
    <Alert variant={session.alert.variant} dismissible onClose={alertHide}>
      {session.alert.message}
    </Alert>
  }
  </header>
);

}

export default Header;
