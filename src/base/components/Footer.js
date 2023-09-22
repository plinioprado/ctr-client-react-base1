import { Container } from "react-bootstrap";
import { useContext } from "react";

import { BaseContext } from "../BaseContext";

function Footer() {

  const shop = useContext(BaseContext);

  return (
    <footer>
      <Container>
        <div>{ shop.session && shop.session.user_name }</div>
      </Container>
    </footer>
  )
}

export default Footer;
