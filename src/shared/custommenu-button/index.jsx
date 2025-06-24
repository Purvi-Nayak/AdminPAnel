import React, { useState, useRef, useEffect } from 'react';
import { classNames } from '../../utils/functions';

const CustomMenuButton = ({
  label,
  icon,
  items = [],
  className = '',
  menuClassName = '',
  buttonClassName = '',
  placement = 'bottom-right',
  disabled = false,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Placement classes mapping
  const placementClasses = {
    'bottom-right': 'top-full right-0',
    'bottom-left': 'top-full left-0',
    'top-right': 'bottom-full right-0',
    'top-left': 'bottom-full left-0',
  };

  return (
    <div className={`relative inline-block ${className}`} ref={menuRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className={classNames(
          'flex items-center space-x-2 px-4 py-2 rounded-md',
          'text-sm font-medium',
          'bg-white-dark text-white hover:bg-white-pure',
          'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white-pure',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          'transition-colors duration-200',
          buttonClassName
        )}
      >
        {icon && <span className="w-5 h-5">{icon}</span>}
        {label && <span>{label}</span>}
      </button>

      {isOpen && (
        <div
          className={classNames(
            'absolute z-50 mt-2 w-48',
            'bg-gray-200 rounded-md shadow-lg',
            'ring-1 ring-black ring-opacity-5',
            placementClasses[placement],
            menuClassName
          )}
        >
          <div className="py-1" role="menu">
            {items.map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  onSelect?.(item);
                  setIsOpen(false);
                }}
                className={classNames(
                  'w-full text-left px-4 py-2 text-sm',
                  'hover:bg-gray-100 hover:text-primarymain',
                  'focus:outline-none focus:bg-gray-100 focus:text-primarymain',
                  'flex items-center space-x-2',
                  item.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
                )}
                disabled={item.disabled}
                role="menuitem"
              >
                {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomMenuButton;