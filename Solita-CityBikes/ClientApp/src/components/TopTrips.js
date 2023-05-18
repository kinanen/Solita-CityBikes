import React from "react";
import { useTable, useExpanded } from "react-table";

const TopTrips = ({ tripList,setTrip,setStation }) => {

    const data = React.useMemo(() => tripList);

    const handleTripClick = (arg) => {
        setStation(null);
        setTrip([arg[0],arg[1]]);
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Suosituimmat matkat',
                columns: [
                    {
                        Header: 'Lähtöasema',
                        accessor: 'departureStationNimi',
                        Cell: ({ cell }) => (
                            <div onClick={() => handleTripClick([cell.row.original.departureStationId, cell.row.original.returnStationId])}>
                              {cell.value}
                            </div>
                            ),       
                    },
                    {
                        Header: 'Palautusasema',
                        accessor: 'returnStationNimi',
                        Cell: ({ cell }) => (
                            <div onClick={() => handleTripClick([cell.row.original.departureStationId, cell.row.original.returnStationId])}>
                              {cell.value}
                            </div>
                            ),       
                    },
                    {
                        Header: 'Matkoja',
                        accessor: 'count',
                        Cell: ({ cell }) => (
                            <div onClick={() => handleTripClick([cell.row.original.departureStationId, cell.row.original.returnStationId])}>
                              {cell.value}
                            </div>
                            ),       
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