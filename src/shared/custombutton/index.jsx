import { classNames } from '../../utils/functions';

const CustomButton = ({
  label,
  type = 'button',
  onClick,
  className = '',
  disabled = false,
  ...props
}) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    className={classNames('flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white-pure shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50', className)}
    {...props}
  >
    {label}
  </button>
);

export default CustomButton;