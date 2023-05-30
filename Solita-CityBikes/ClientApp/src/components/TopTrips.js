import React, { useState } from 'react';
import { useTable, useExpanded } from "react-table";

const TopTrips = ({ tripList, setTrip, setStation, setPage, stations }) => {
    const [pageNumber, setPageNumber] = useState(1);
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
                        Header: 'Matkoja välillä yhteensä',
                        accessor: 'count',
                        Cell: ({ cell }) => (
                            <div style={{textAlign:'right'}} onClick={() => handleTripClick([cell.row.original.departureStationId, cell.row.original.returnStationId])}>
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
    },
    useExpanded
    );

    return (
        <div className='top-list-container'> 
        {stations &&
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
            <button onClick={() => { if (pageNumber > 1) { setPageNumber(prevPageNumber => prevPageNumber - 1); setPage(pageNumber - 1); } }}>Edelliset</button>
            sivu <strong>{pageNumber}</strong>
            <button onClick={() => { setPageNumber(prevPageNumber => prevPageNumber + 1); setPage(pageNumber + 1); }}>Seuraavat</button>
            </div>
        }
    </div>
    )
}

export default TopTrips;