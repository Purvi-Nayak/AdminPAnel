import { classNames } from "../../utils/functions";
import InputText from "../InputText";


const FormGroup = ({ 
  label, 
  labelClassName = "", 
  error, 
  errorClassName = "", 
  ...props 
}) => {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label 
          className={classNames('font-medium text-sm text-black', labelClassName)}
        >
          {label}
        </label>
      )}
      <InputText {...props} error={error}  />
      {error && (
        <p 
          className={classNames('text-xs text-status-error-dark mt-1', errorClassName)}
        >
          {error?.message || ""}
        </p>
      )}
    </div>
  );
};

export default FormGroup;