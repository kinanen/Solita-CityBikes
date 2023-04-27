import React from "react";
import {useTable} from "react-table";

const TopStations = ({stationList}) => {
    
    const data = React.useMemo(() => stationList);

    const handleStationClick = (args) => {
        console.log(args);
    }

    const columns = React.useMemo(
        () => [
          {
            Header: 'Suosituimmat asemat',
            columns: [
              {
                Header: 'Asema',
                accessor: 'stationName',
                Cell: ({ cell }) => (
                    <div onClick={() => handleStationClick(cell.row.original.stationHslId)}>
                      {cell.value}
                    </div>
                    ),                    
              },
              {
                Header: 'Lähtöjä asemalta',
                accessor: 'departureCount',
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

export default TopStations; 