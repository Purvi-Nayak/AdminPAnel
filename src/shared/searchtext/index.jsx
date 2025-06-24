import React from 'react';
import { FaSearch } from 'react-icons/fa';

const SearchBox = ({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  ...props
}) => (
  <div className={`relative w-full ${className}`}>
    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
      <FaSearch />
    </span>
    <input
      type="text"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500 transition-colors"
      {...props}
    />
  </div>
);

export default SearchBox;