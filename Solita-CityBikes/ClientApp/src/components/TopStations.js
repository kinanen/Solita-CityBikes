import { useMemo, useState, useEffect} from "react";
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
            Header: 'Asema',
            accessor: 'stationId',
            Cell: ({ cell }) => (
              <div onClick={() => handleStationClick(cell.row.original.stationId)}>
                {cell.value}
              </div>
            ),
          },
          {
            Header: 'Lähtöjä asemalta',
            accessor: 'departureCount',
          },
          {
            Header: 'Palautuksia asemalle',
            accessor: 'returnCount',
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

  const viewableTopStations = filteredData.map(station => {
    return stations.find(s => station.stationId === s.hslStationId);
  }).filter(function (element) {
    return element !== undefined;
  });

  useEffect(()=>{
    setOnViewStations(viewableTopStations);
  },[filteredData])

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
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render('Header')}
                {/* Add a sort direction indicator */}
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
          {page.map((row, i) => {
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