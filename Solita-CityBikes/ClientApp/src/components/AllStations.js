
import React from "react";
import { useTable } from "react-table";

const AllStations = ({ stationList, setStation, setTrip }) => {

    const data = React.useMemo(() => stationList);

    const handleStationClick = (arg) => {
        setTrip(null);
        setStation(arg);

    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Kaikki asemat',
                columns: [
                    {
                        Header: 'Aseman nimi',
                        accessor: 'nimi',
                        Cell: ({ cell }) => (
                            <div onClick={() => handleStationClick(cell.row.original.hslStationId)}>
                                {cell.value}
                            </div>
                        ),
                    },
                    {
                        Header: 'Osoite',
                        accessor: 'osoite',
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
    })

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


export default AllStations;