import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string | null;
  className?: string;
  additionalStyles?: string;
}

const BaseInput = ({
  label,
  error,
  className,
  additionalStyles,
  ...props
}: InputProps) => {
  const inputID = `${label.toLowerCase()}-${Math.round(Math.random() * 10000)}`;

  return (
    <div className="w-full">
      <label
        htmlFor={inputID}
        className={`block mb-2 ${
          error ? "text-red-500" : "text-gray-700"
        } mb-1 font-semibold`}
      >
        {label}
      </label>
      <input
        id={inputID}
        className={
          className
            ? className
            : `block w-full p-2 h-14 ${
                error
                  ? "bg-red-50 border border-red-500 text-red-900"
                  : "bg-backgroundColor border border-borderColorLight focus:bg-white focus:border-borderColorLight"
              } text-md rounded-md  focus:outline-none disabled:bg-backgroundColor2 ${additionalStyles}`
        }
        {...props}
      />
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default BaseInput;
