import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import ReportFilter from "../report/ReportFilter";

import request from "../../data/request";

function Accounts() {
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(false);

  function getQstring(data) {
    let qstring = "";

    if (!data || !data.filters) return qstring;

    if (data.filters.date)
      qstring += `date=${data.filters.date}&date_to=${data.filters.date_to}`;
    if (data.filters.acc) {
      if (qstring !== "") qstring += "&";
      qstring += `acc=${data.filters.acc.replaceAll(
        ".",
        "",
      )}&acc_to=${data.filters.acc_to.replaceAll(".", "")}`;
    }
    return `?${qstring}`;
  }

  useEffect(() => {
    async function fetchData() {
      const url = `report/chart_accounts`;
      const qString = getQstring(data);
      const newData = await request(url, qString);
      await setData(newData.data);
    }
    fetchData();
  }, [refresh]);

  const handleFilterChange = (fieldName, fieldVal) => {
    setData({
      ...data,
      filters: {
        ...data.filters,
        [fieldName]: fieldVal,
      },
    });
  };

  const handleRefresh = () => setRefresh(!refresh);

  return (
    <main>
      {!data ? (
        <Container>
          <p>Loading</p>
        </Container>
      ) : (
        <Container>
          <h2>Accounts</h2>
          <Table>
            <thead>
              <tr>
                <td colSpan="3">
                  <ReportFilter
                    filters={data.filters}
                    handleFilterChange={handleFilterChange}
                    handleRefresh={handleRefresh}
                  />
                </td>
              </tr>
              <tr>
                <th>Number</th>
                <th>Name</th>
                <th>Dc</th>
              </tr>
            </thead>
            <tbody>
              {data &&
                data.table &&
                data.table.map(
                  (row, key) =>
                    key > 0 && (
                      <tr key={key}>
                        <td>
                          <a href={`/ledger/accounts/${row[0]}`}>{row[0]}</a>
                        </td>
                        <td>{row[1]}</td>
                        <td>{row[2]}</td>
                      </tr>
                    ),
                )}
            </tbody>
          </Table>
        </Container>
      )}
    </main>
  );
}

export default Accounts;
