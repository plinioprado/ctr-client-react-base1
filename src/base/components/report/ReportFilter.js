import { Button } from "react-bootstrap"
import ReportFieldDate from "./ReportFieldDate"

function ReportFilter({filters, handleFilterChange, handleRefresh}) {

    return (
        <table>
            <tbody>
            <tr>
            {
                filters && Object.keys(filters).includes('date') &&
                <td>
                    <ReportFieldDate
                        fieldChangeValue={handleFilterChange}
                        fieldLabel="Date from"
                        fieldName="date"
                        fieldPlaceHolder="    -  -  "
                        fieldValue={filters.date}
                    />
                    </td>
            }
            {
                filters && Object.keys(filters).includes('date_to') &&
                <td>
                <ReportFieldDate
                    fieldChangeValue={handleFilterChange}
                    fieldLabel="Date to"
                    fieldName="date_to"
                    fieldPlaceHolder=" . . "
                    fieldValue={filters.date_to}
                />
                </td>
            }
            {
                filters && Object.keys(filters).includes('acc') &&
                    <td>
                <ReportFieldDate
                    fieldChangeValue={handleFilterChange}
                    fieldLabel="Acc from"
                    fieldName="acc"
                    fieldPlaceHolder=" . . "
                    fieldValue={filters.acc}
                />
                </td>
            }
            {
                filters && Object.keys(filters).includes('acc_to') &&
                <td>
                <ReportFieldDate
                    fieldChangeValue={handleFilterChange}
                    fieldLabel="Acc to"
                    fieldName="acc_to"
                    fieldPlaceHolder=" . . "
                    fieldValue={filters.acc_to}
                />
                </td>
                }
            <td>
            <Button
                variant="secondary"
                onClick={() => handleRefresh()}
            >
                Recalc
            </Button>
            </td>
            </tr>
            </tbody>
        </table>

    )
}

export default ReportFilter
