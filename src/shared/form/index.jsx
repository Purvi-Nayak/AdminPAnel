import React from 'react';

const CustomForm = ({ children, onSubmit, className = '', ...props }) => (
  <form
    onSubmit={onSubmit}
    className={`bg-white-pure shadow-md rounded px-2 pt-4 pb-6 mb-4 ${className}`}
    {...props}
  >
    {children}
  </form>
);

export default CustomForm;
