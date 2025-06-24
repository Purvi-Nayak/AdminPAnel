import { useState, useRef, useEffect } from "react";

const CustomSelect = ({
  options = [],
  onChange,
  placeholder = "Select an option",
  label,
  error,
  value,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && <label className="block text-sm font-medium mb-1">{label}</label>}

      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full px-4 py-2 text-left border rounded-md bg-white focus:outline-none ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      >
        {selectedOption ? selectedOption.label : (
          <span className="text-gray-400">{placeholder}</span>
        )}
      </button>

      {open && (
        <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-400 rounded-md shadow-lg max-h-60 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange?.({ target: { value: option.value } });
                setOpen(false);
              }}
              className="px-4 py-2 hover:bg-gray-400 cursor-pointer"
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}

      {error && <p className="text-status-error-dark text-sm ">This field is required.</p>}
    </div>
  );
};

export default CustomSelect;


