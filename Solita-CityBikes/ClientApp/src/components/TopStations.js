import React from "react";
import {useTable} from "react-table";

const TopStations = ({stationList}) => {
        
    const data = React.useMemo(() => stationList);

    const columns = React.useMemo(
        () => [
          {
            Header: 'Suosituimmat asemat',
            columns: [
              {
                Header: 'Asema',
                accessor: 'stationName',
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

      


    console.log(stationList)
    const viewStationList = stationList.map(element =>

        <li key={element.stationHslId}>{element.stationName + ": " + element.departureCount}</li>)

    return (
        <div>
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