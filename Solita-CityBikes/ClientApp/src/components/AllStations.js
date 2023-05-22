import React, { useState, useMemo } from "react";
import { useTable, usePagination } from "react-table";

const AllStations = ({ stationList, setStation, setTrip }) => {
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 20;
  const [searchQuery, setSearchQuery] = useState('');

  const handleStationClick = (arg) => {
    setTrip(null);
    setStation(arg);
  }

  const columns = useMemo(
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

  const data = useMemo(() => stationList, [stationList]);
  
  const filteredData = useMemo(() => {
    return data.filter(item =>
      item.nimi.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [data, searchQuery]);
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
  } = useTable(
    {
      columns,
      data : filteredData,
      initialState: { pageIndex, pageSize },
    },
    usePagination
  );

  const handleSearch = event => {
    setSearchQuery(event.target.value);
    setPageIndex(0);
  };



  return (
    <div className="list">
      <div className="search-bar">
        <input type="text" value={searchQuery} onChange={handleSearch} placeholder="Search" />
      </div>
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
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                })}
              </tr>
            );
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

export default AllStations;
