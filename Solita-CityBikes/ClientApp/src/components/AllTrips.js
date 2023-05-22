import Trips from "../services/Trips";
import React, { useEffect, useState } from 'react';
import { useTable, useExpanded } from "react-table";


const AllTrips = ({ setTrip, setStation }) => {
    const [trips, setTrips] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 20;

    useEffect(() => {
        Trips.getPaginatedTrips(pageNumber, pageSize)
            .then(response => {
                setTrips(response.data)
                console.log(response.data);
            });
    }
        , [pageNumber, pageSize])

    const data = React.useMemo(() => trips);

    const handleTripClick = (arg) => {
        setStation(null);
        setTrip([arg[0], arg[1]]);
    }

    const columns = React.useMemo(
        () => [
            {
                Header: 'Kaikki matkat',
                columns: [
                    {
                        Header: 'Lähtöasema',
                        accessor: 'departureStationId',
                        Cell: ({ cell }) => (
                            <div onClick={() => handleTripClick([cell.row.original.departureStationId, cell.row.original.returnStationId])}>
                                {cell.value}
                            </div>
                        ),
                    },
                    {
                        Header: 'Palautusasema',
                        accessor: 'returnStationId',
                        Cell: ({ cell }) => (
                            <div onClick={() => handleTripClick([cell.row.original.departureStationId, cell.row.original.returnStationId])}>
                                {cell.value}
                            </div>
                        ),
                    },
                    {
                        Header: 'Matkan kesto (minuuttia)',
                        accessor: 'duration',
                        Cell: ({ cell }) => (
                            <div onClick={() => handleTripClick([cell.row.original.departureStationId, cell.row.original.returnStationId])}>
                                {cell.value}
                            </div>
                        ),
                    },
                    {
                        Header: 'Ajettu matka',
                        accessor: 'coveredDistance',
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
    }, useExpanded)


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
            <button onClick={() =>{ if(pageNumber > 1){setPageNumber(pageNumber - 1)}}}>Edelliset</button>
            <button onClick={() => setPageNumber(pageNumber + 1)}>Seuraavat</button>
        </div>
    )
}

export default AllTrips;