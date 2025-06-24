import React from 'react';
import { FaCheck } from 'react-icons/fa';
import { classNames } from '../../utils/functions';

const Checkbox = ({
  label,
  checked,
  onChange,
  disabled = false,
  className
}) => {
  return (
    <div className="flex items-center">
      <label className="relative flex items-center cursor-pointer">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="sr-only"
        />
        <div
          className={classNames(
            'w-5 h-5 border-2 border-black rounded-md',
            'flex items-center justify-center',
            'transition-all duration-200',
            disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-primarymain',
            checked ? 'bg-primarymain border-primarymain' : 'bg-white',
            className
          )}
        >
          <FaCheck 
            className={classNames(
              'w-3 h-3 text-white transition-transform duration-200',
              checked ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
            )} 
          />
        </div>
        {label && (
          <span className="ml-2 text-sm font-roboto text-black">
            {label}
          </span>
        )}
      </label>
    </div>
  );
};

export default Checkbox;