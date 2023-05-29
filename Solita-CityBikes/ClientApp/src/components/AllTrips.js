import Trips from "../services/Trips";
import React, { useEffect, useState } from 'react';
import { useTable, useExpanded } from "react-table";


const AllTrips = ({ setTrip, setStation, stations}) => {
    const [trips, setTrips] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const pageSize = 20;

    useEffect(() => {
        Trips.getPaginatedTrips(pageNumber, pageSize)
            .then(response => {
                setTrips(response.data)
            });
    }
        , [pageNumber, pageSize])

    const data = React.useMemo(() => trips);

    const handleTripClick = (arg) => {
        setStation(null);
        setTrip([arg[0], arg[1]]);
    }

    const secView = (arg) => {
        if(arg < 10 ) return `0${arg}`
        else return arg
    }  
    
    const columns = React.useMemo(
        () => [
            {
                Header: 'Kaikki matkat',
                columns: [
                    {
                        Header:'Lähtöaika',
                        accessor:'departureTime'
                    },
                    {
                        Header: 'Lähtö- ja kohdeasema',
                        accessor: 'departureStationId',
                        Cell: ({ cell }) => {
                          const departureStation = stations.find((s) => cell.value === s.hslStationId);
                          const returnStation = stations.find((s) => cell.row.original.returnStationId === s.hslStationId);
                          return (
                            <a href="#" onClick={() => handleTripClick([cell.row.original.departureStationId, cell.row.original.returnStationId])}>
                              {departureStation && returnStation ? `${departureStation.nimi} - ${returnStation.nimi}` : ''}
                            </a>
                          );
                        },
                      },
                    {
                        Header: 'Matkan kesto (minuuttia)',
                        accessor: 'duration',
                        Cell: ({ cell }) => (
                            <div onClick={() => handleTripClick([cell.row.original.departureStationId, cell.row.original.returnStationId])}>
                                {Math.floor(cell.value/60)+":"+ secView(Math.round(cell.value%60))}
                            </div>
                        ),
                    },
                    {
                        Header: 'Ajettu matka(km)',
                        accessor: 'coveredDistance',
                        Cell: ({ cell }) => (
                            <div onClick={() => handleTripClick([cell.row.original.departureStationId, cell.row.original.returnStationId])}>
                                {Math.round(cell.value/1000 * 100) / 100}
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
            sivu <strong>{pageNumber}</strong>
            <button onClick={() => setPageNumber(pageNumber + 1)}>Seuraavat</button>
        </div>
    )
}

export default AllTrips;