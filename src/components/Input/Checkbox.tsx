import React from "react";
interface Iprops {
  children: JSX.Element;
  ariaLabel: string;
  name: string;
  onChange: any;
  value: any;
}
const Checkbox = ({ children, ariaLabel, name, onChange, value }: Iprops) => {
  return (
      <label
        aria-label={ariaLabel}
        htmlFor="checkbox"
        className="cursor-pointer checkbox-label flex gap-2 items-center"
      >
        <input
          type="checkbox"
          onChange={onChange}
          name={name}
          checked={value}
          id="checkbox"
          className="sr-only"
        />
        <span className="rounded-md h-5 w-5 flex justify-center items-center border border-theme-gray-125">
          <svg
            className="tick"
            xmlns="http://www.w3.org/2000/svg"
            width="12"
            height="8"
            viewBox="0 0 12 8"
            fill="none"
          >
            <path
              d="M10.6663 0.791626L4.24967 7.20829L1.33301 4.29163"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        {children}
      </label>
  );
};

export default Checkbox;
