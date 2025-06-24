import React, { useMemo, useState } from 'react';
import { FaSort, FaSortUp, FaSortDown, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Table = ({ 
  columns = [], 
  data = [], 
  className = '',
  emptyMessage = 'No data available',
  onSort,
  sortConfig = { key: '', direction: '' },
  filters = {},
  onFilter,
  itemsPerPage = 10, // Default items per page
}) => {
  const [localSortConfig, setLocalSortConfig] = useState(sortConfig);
  const [localFilters, setLocalFilters] = useState(filters);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (key) => {
    let direction = 'asc';
    if (localSortConfig.key === key) {
      direction = localSortConfig.direction === 'asc' ? 'desc' : 'asc';
    }
    setLocalSortConfig({ key, direction });
    if (onSort) {
      onSort({ key, direction });
    }
  };

  const handleFilter = (key, value) => {
    const newFilters = { ...localFilters, [key]: value };
    setLocalFilters(newFilters);
    if (onFilter) {
      onFilter(newFilters);
    }
  };

  const getSortIcon = (columnId) => {
    if (localSortConfig.key !== columnId) return <FaSort className="ml-1" />;
    return localSortConfig.direction === 'asc' ? 
      <FaSortUp className="ml-1" /> : 
      <FaSortDown className="ml-1" />;
  };

  const renderFilterDropdown = (column) => {
    if (!column.filterable) return null;

    const options = column.filterOptions || 
      [...new Set(data.map(item => item[column.field_name]))];

    return (
      <select
        className="ml-2 text-xs border rounded px-1"
        value={localFilters[column.field_name] || ''}
        onChange={(e) => handleFilter(column.field_name, e.target.value)}
      >
        <option value="">All</option>
        {options.map((option) => (
          <option key={option} value={option}>
           
          </option>
        ))}
      </select>
    );
  };

  const processedData = useMemo(() => {
    let result = [...data];

    // Apply filters
    Object.keys(localFilters).forEach(key => {
      const filterValue = localFilters[key];
      if (filterValue) {
        result = result.filter(item => 
          String(item[key]).toLowerCase().includes(filterValue.toLowerCase())
        );
      }
    });

    // Apply sorting
    if (localSortConfig.key) {
      result.sort((a, b) => {
        const aValue = a[localSortConfig.key];
        const bValue = b[localSortConfig.key];
        
        if (aValue < bValue) return localSortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return localSortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }

    // Add row index
    return result.map((row, index) => ({
      ...row,
      rowIndex: index + 1
    }));
  }, [data, localSortConfig, localFilters]);

  // Pagination calculations
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = processedData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    return (
      <div className="flex items-center justify-between px-4 py-3 bg-white border-t border-gray-200">
        <div className="flex items-center">
          <span className="text-sm text-gray-700">
            Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, processedData.length)} of{' '}
            {processedData.length} entries
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1 text-sm rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronLeft />
          </button>
          
          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className={`px-3 py-1 text-sm rounded hover:bg-gray-100`}
              >
                1
              </button>
              {startPage > 2 && <span className="px-2">...</span>}
            </>
          )}

          {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i).map(page => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 text-sm rounded ${
                currentPage === page
                  ? 'bg-primarymain text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}

          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && <span className="px-2">...</span>}
              <button
                onClick={() => handlePageChange(totalPages)}
                className={`px-3 py-1 text-sm rounded hover:bg-gray-100`}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-2 py-1 text-sm rounded hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-white rounded-lg shadow overflow-hidden ${className}`}>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-primarymain">
          <tr className="text-white-pure">
            <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
              #
            </th>
            {columns.map((column) => (
              <th
                key={column.id}
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider cursor-pointer"
                onClick={() => column.sortable && handleSort(column.field_name)}
              >
                <div className="flex items-center">
                  {column.label}
                  {column.sortable && getSortIcon(column.field_name)}
                  {renderFilterDropdown(column)}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <tr key={row.id || `row-${rowIndex}`} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.rowIndex}
                </td>
                {columns.map((column) => (
                  <td
                    key={`${row.id}-${column.id}`}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                  >
                    {column.render ? 
                      column.render({ row, rowIndex }) : 
                      row[column.field_name] || '--'
                    }
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={columns.length + 1} className="px-6 py-4 text-center text-gray-500">
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
    {renderPagination()}
      </div>
  
    </div>
  );
};

export default Table;