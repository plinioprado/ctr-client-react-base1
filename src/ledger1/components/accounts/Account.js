import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { Button, Container, Form } from "react-bootstrap";
import AccountFieldNum from "./AccountFieldNum";
import AccountFieldName from "./AccountFieldName";
import AccountFieldDc from "./AccountFieldDc";

import request from "../../data/request";

function Account() {
  let { num } = useParams();

  const [data, setData] = useState({
    num: "",
    name: "",
    dc: "D",
  });
  useEffect(() => {
    async function fetchData() {
      const url = `account/111`;
      const newData = await request(url);
      console.log(2, newData);
      await setData(newData.data[0]);
    }
    fetchData();
  }, []);

  const errorMessage = {
    num: "",
    name: "",
    dc: "",
  };
  const onFormSubmit = () => console.log(1, data);
  const valueChange = (name, value) =>
    setData({
      ...data,
      [name]: value,
    });

  return (
    <main>
      <Container>
        <h2>Account {num}</h2>
        <Form>
          <div className="row">
            <AccountFieldNum
              valueChange={valueChange}
              errorMessage={errorMessage.num}
              md={2}
              value={data.num}
            />
            <AccountFieldName
              valueChange={valueChange}
              errorMessage={errorMessage.name}
              md={9}
              value={data.name}
            />
            <AccountFieldDc
              valueChange={valueChange}
              errorMessage={errorMessage.dc}
              md={1}
              value={data.dc}
            />
            <p>&nbsp;</p>
            <Button onClick={onFormSubmit}>Submit</Button>
          </div>
        </Form>
      </Container>
    </main>
  );
}

export default Account;
