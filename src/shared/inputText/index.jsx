import { useState, useCallback } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { classNames } from "../../utils/functions";

const InputText = ({
  name,
  register,
  error,
  startAdornment,
  endAdornment,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleToggle = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const inputType =
    props.type === "password"
      ? showPassword
        ? "text"
        : "password"
      : props.type;

  return (
    <div className="relative">
      {startAdornment && (
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
          {startAdornment}
        </div>
      )}
      <input
        id={name}
        {...register(name)}
        {...props}
        error={error}
        type={inputType}
        className={classNames(
          "block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 outline-offset-1 outline-gray-300 border border-gray-300 placeholder:text-gray-400 focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
        )}
      />
      {endAdornment && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
          {endAdornment}
        </div>
      )}
      {props.type === "password" && (
        <button
          type="button"
          onClick={handleToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default InputText;
