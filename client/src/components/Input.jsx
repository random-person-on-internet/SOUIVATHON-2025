import React, { useId } from "react";

const Input = React.forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref
) {
  const id = useId();
  return (
    <div className="w-full">
      {label && (
        <label
          className="inline-block mb-1 pl-1 text-sm font-medium text-gray-200"
          htmlFor={id}
        >
          {label}
        </label>
      )}
      <input
        type={type}
        className={`px-4 py-2 rounded-lg bg-gray-800 text-gray-200 outline-none 
                      focus:bg-gray-700 focus:ring-2 focus:ring-green-500
                      hover:bg-gray-700 transition duration-200 border border-gray-600 
                      shadow-sm w-full ${className}`}
        ref={ref}
        {...props}
        id={id}
      />
    </div>
  );
});

export default Input;

{
  /* <div className="w-full">
  {label && (
    <label className="inline-block mb-1 pl-1" htmlFor={id}>
      {label}
    </label>
  )}
  <input
    type={type}
    className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
    ref={ref}
    {...props}
    id={id}
  />
</div>; */
}
