import { useMemo, useState, useEffect } from "react";
import React from "react";
import { useTable, useSortBy, usePagination, useExpanded } from "react-table";

const TopStations = ({ stations, stationList, setStation, setTrip, setOnViewStations }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const pageSize = 20;

  const data = useMemo(() => stationList, [stationList]);

  const handleStationClick = (arg) => {
    setTrip(null);
    setStation(arg);

  }

  const columns = React.useMemo(
    () => [
      {
        Header: 'Suosituimmat asemat',
        columns: [
          {
            Header: '#',
            accessor: 'rowNumber',
            Cell: ({ cell }) => (
              <div onClick={() => handleStationClick(cell.row.original.stationId)}>
                {cell.value}
              </div>
            ),
          },
          {
            Header: 'Asema',
            accessor: 'stationId',
            Cell: ({ cell }) => (
              <a href="#" onClick={() => handleStationClick(cell.row.original.stationId)}>
                {stations.find(s => cell.value === s.hslStationId).nimi}
              </a>
            ),
          },
          {
            Header: 'Lähtöjä asemalta',
            accessor: 'departureCount',
            Cell: (cell) =>(
              <div style={{textAlign:'right'}}>{cell.value}</div>
            )
          },
          {
            Header:'Palautuksia asemalle',
            accessor: 'returnCount',
            Cell: (cell) =>(
              <div style={{textAlign:'right'}}>{cell.value}</div>
            )
          }
        ],
      },
    ],
    []
  )

  const filteredData = useMemo(() => {
    return data.filter(item => item
      //item.nimi.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    rows,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
  } = useTable({
    columns,
    data: filteredData,
    initialState: { pageIndex, pageSize },
  },
    useSortBy,
    usePagination

  );

  const viewableTopStations = page.map(station => {
    return stations.find(s => station.values.stationId === s.hslStationId);
  }).filter(function (element) {
    return element !== undefined;
  });

  
  useEffect(() => {
    setOnViewStations(viewableTopStations);
  }, [page])



  /*
  const handleSearch = event => {
    setSearchQuery(event.target.value);
    setPageIndex(0);
  };
  */

  return (
    <div className="list">
      {/* <div className="search-bar">
         type="text" value={searchQuery} onChange={handleSearch} placeholder="Search" />}
      </div>
    */}
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  {column.render('Header')}
                  <span>
                    {column.isSorted
                      ? column.isSortedDesc
                        ? ' 🔽'
                        : ' 🔼'
                      : ''}
                  </span></th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
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
      <div className="pagination">
        <button onClick={() => { previousPage(); setPageIndex(pageIndex - 1) }} disabled={!canPreviousPage}>
          Previous
        </button>
        <span>
          Page{' '}
          <strong>
            {pageIndex + 1} of {Math.ceil(filteredData.length / pageSize)}
          </strong>
        </span>
        <button onClick={() => { nextPage(); setPageIndex(pageIndex + 1) }} disabled={!canNextPage}>
          Next
        </button>
      </div>
    </div>

  )
}

export default TopStations; 