import { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import Table from 'react-bootstrap/Table';
import ReportRow from "./ReportRow";
import ReportFilter from "./ReportFilter";

import request from "../../data/request";

function Report({ name }) {

    const [data, setData] = useState(null);
    const [format, setFormat] = useState(null);
    const [refresh, setRefresh] = useState(false)

    function getQstring(data) {
        let qstring = ''

        if (!data || !data.filters) return qstring

        if (data.filters.date) qstring += `date=${data.filters.date}&date_to=${data.filters.date_to}`
        if (data.filters.acc) {
            if (qstring !== '') qstring += '&'
            qstring += `acc=${data.filters.acc.replaceAll('.', '')}&acc_to=${data.filters.acc_to.replaceAll('.', '')}`
        }
        return `?${qstring}`
    }

    useEffect(
        () => {
          async function fetchData() {
            const url = `report/${name}`
            const qString = getQstring(data)
            const newData = await request(url, qString);
            await setData(newData.data)
            await setFormat(newData.format)
          };
        fetchData()

        },
        [name, refresh]);

    const handleFilterChange = (fieldName, fieldVal ) => {
        setData({
            ...data,
            filters: {
                ...data.filters,
                [fieldName]: fieldVal
            }
        })
    }

    const handleRefresh = () => setRefresh(!refresh)


    return (
        <main>
            {
            !data ?
            <Container><p>Loading</p></Container>
            :
            <Container>
                <h2>Report</h2>
                <h3>{data && data.header && data.header.title}</h3>
                <Table>
                    <thead>
                        <tr>
                            {
                                format &&
                                format.cols.map((cell, key) => <td key={key} >
                                        {cell.header}
                                    </td>)
                            }
                        </tr>
                        <tr>
                            <td colSpan={format.cols.length }>
                                <ReportFilter
                                    filters={data.filters}
                                    handleFilterChange={handleFilterChange}
                                    handleRefresh={handleRefresh}
                                />
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        data && data.table && data.table.map(
                            (row, key) => (
                                key > 0 &&
                                <tr key={key}><ReportRow
                                    rowData={row}
                                    formatCols={format.cols}
                                /></tr>
                            ))
                        }
                    </tbody>
                </Table>
            </Container>
        }
        </main>
    )
}

export default Report;
