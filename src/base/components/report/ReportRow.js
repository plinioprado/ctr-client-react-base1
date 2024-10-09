function ReportRow ({rowData, formatCols}) {

    return rowData.map((cell, key) => {
        const cellClass = ['amount', 'int'].includes(formatCols[key].type) ? 'number' : ''
        const val = formatCols[key].type === 'amount' ? cell.toFixed(2) : cell

        return (
            <td
                key={key}
                className={cellClass}
            >
                {val}</td>
        )
    })
}

export default ReportRow;
