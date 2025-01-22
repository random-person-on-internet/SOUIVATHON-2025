import React, { forwardRef, useId } from "react";

function Select({ options = [], label, className = "", ...props }, ref) {
  const id = useId();

  return (
    <div className="w-full ">
      {label && <label htmlFor={id} className=""></label>}
      <select
        id={id}
        ref={ref}
        className={`px-4 py-3 rounded-lg bg-gray-800 text-gray-200 outline-none hover:bg-gray-700 focus:bg-gray-700 focus:ring-2 focus:ring-green-500 transition duration-200 border border-gray-600 shadow-sm w-full ${className}`}
        {...props}
      >
        {options?.map((e) => (
          <option
            value={e}
            key={e}
            className="bg-gray-800 text-gray-200 hover:bg-slate-700"
          >
            {e}
          </option>
        ))}
      </select>
    </div>
  );
}

export default forwardRef(Select);

// return (
//   <div className="w-full">
//     {label && <label htmlFor={id} className=""></label>}
//     <select
//       {...props}
//       id={id}
//       ref={ref}
//       className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
//     >
//       {options?.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   </div>
// );
