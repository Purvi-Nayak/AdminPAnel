
import React from "react";

const CustomModal = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  showCloseIcon = true,
  titleClass = "",
  contentClass = "",
  ...props
}) => {
  if (!isOpen) return null;

  return (
    <div className=" bg-black-pure fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white-pure rounded-lg shadow-lg max-w-lg w-full mx-4 ${contentClass}`}
        {...props}
      >
        {title && (
          <div
            className={`flex items-center justify-between px-6 py-4 border-b border-table-border ${titleClass}`}
          >
            <h2 className="text-xl font-semibold text-black-pure">{title}</h2>
            {showCloseIcon && (
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-700 text-2xl focus:outline-none"
                aria-label="close"
              >
                &times;
              </button>
            )}
          </div>
        )}

        <div className="px-6 py-4">{children}</div>

        {actions && (
          <div className="flex justify-end gap-2 px-6 py-3 border-t border-table-border">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomModal;
