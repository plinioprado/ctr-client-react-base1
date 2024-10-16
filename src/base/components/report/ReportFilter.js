import { Button } from "react-bootstrap"
import ReportFieldDate from "./ReportFieldDate"
import FieldFilterText from "../filter/FieldFilterText"

function ReportFilter({filters, handleFilterChange, handleRefresh}) {

    return (
        <div className='table-filter'>
            <div>
            {
                filters && Object.keys(filters).includes('date') &&
                    <div>
                        <span>Date from</span>
                        <FieldFilterText
                            name="date"
                            value={filters.date}
                            onChange={handleFilterChange}
                        />
                    </div>
            }
            {
                filters && Object.keys(filters).includes('date_to') &&
                <div>
                    <span>Date to</span>
                    <FieldFilterText
                        name="date_to"
                        value={filters.date_to}
                        onChange={handleFilterChange}
                    />
                </div>
            }
            {
                filters && Object.keys(filters).includes('acc') &&
                <div>
                    <span>Acc from</span>
                    <FieldFilterText
                        name="acc"
                        value={filters.acc}
                        onChange={handleFilterChange}
                    />
                </div>
            }
            {
                filters && Object.keys(filters).includes('acc_to') &&
                <div>
                    <span>Acc to</span>
                    <FieldFilterText
                        name="acc_to"
                        value={filters.acc_to}
                        onChange={handleFilterChange}
                    />
                </div>
                }
                <Button
                    className="filter_button"
                    variant="secondary"
                    onClick={() => handleRefresh()}
                >
                    Recalc
                </Button>
                </div>
        </div>

    )
}

export default ReportFilter
