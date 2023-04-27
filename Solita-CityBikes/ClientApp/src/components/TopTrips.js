import React from "react";
import { useTable, useExpanded } from "react-table";

const TopTrips = ({ tripList }) => {

    const data = React.useMemo(() => tripList);

    const columns = React.useMemo(
        () => [
            {
                Header: 'Suosituimmat asemat',
                columns: [
                    {
                        Header: 'Lähtöasema',
                        accessor: 'departureStationNimi',
                    },
                    {
                        Header: 'Palautusasema',
                        accessor: 'returnStationNimi',
                    },
                    {
                        Header: 'Matkoja',
                        accessor: 'count',
                    }
                ],
            },
        ],
        []
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns,
        data,
    },useExpanded)

    return (
        <div className="list">
            <table {...getTableProps()}>
                <thead>
                    {headerGroups.map(headerGroup => (
                        <tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map(column => (
                                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row)
                        return (
                            <tr {...row.getRowProps()}>
                                {row.cells.map(cell => {
                                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default TopTrips;