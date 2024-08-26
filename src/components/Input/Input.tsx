// import InputError from "./InputError";
import { ChangeEvent, useState } from "react";
import {
  AlertIcon,
  EyeCloseIcon,
  EyeOpenIcon,
  SearchIcon,
} from "@/components/Icons";
import { FormikProps } from "formik";
interface Iprops {
  id?: string;
  placeholder?: string;
  className?: string;
  parentClass?: string;
  type?: string;
  spanClass?: string;
  name?: any;
  rest?: any;
  register?: any;
  value?: any;
  onChange?: any;
  onClick?: any;
  max?: any;
  min?: any;
  step?: any;
  prefix?: any;
  pattern?: any;
  title?: string;
  disabled?: boolean;
  error?: any;
  autoFocus?: boolean;
  searchInput?: boolean;
  maxLength?: number;
  oninput?: any;
  specialCharater?: string;
  children?: any;
  ariaLabel?: string;
  hideErrors?: boolean;
  formik?: FormikProps<any>;
}
const Input = ({
  id,
  placeholder,
  className,
  parentClass,
  hideErrors,
  value,
  onChange,
  type,
  register,
  max,
  min,
  step,
  prefix,
  pattern,
  title,
  disabled,
  error,
  autoFocus,
  onClick,
  searchInput,
  oninput,
  maxLength,
  specialCharater,
  children,
  ariaLabel,
  name,
  formik,
  ...rest
}: Iprops) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={`relative ${parentClass || ""}`}>
      <label
        htmlFor={id}
        className="block text-sm font-medium leading-6 text-white lg:text-gray-900 mb-1"
      >
        {id}
      </label>
      <input
        aria-label={ariaLabel ? ariaLabel : "input"}
        spellCheck="false"
        type={
          type
            ? type === "password"
              ? showPassword
                ? "text"
                : type
              : type
            : "text"
        }
        id={id}
        name={name}
        pattern={pattern}
        max={max}
        step={step && step}
        title={title}
        min={min}
        value={formik ? formik.values[name] : value}
        prefix={prefix ? prefix : ""}
        disabled={disabled}
        placeholder={placeholder}
        maxLength={maxLength}
        className={`block w-full rounded-md border py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-700 sm:text-sm sm:leading-6 pl-3`}
        onBlur={formik?.handleBlur}
        onInput={formik?.handleBlur}
        onChange={formik ? formik?.handleChange : onChange}
        {...rest}
      />
      {type === "password" &&
        (showPassword ? (
          <EyeCloseIcon
            className="h-5 w-5 absolute top-8 -translate-y-1/2 right-2 text-gray-500 cursor-pointer transition-all"
            onClick={() => setShowPassword(!showPassword)}
          />
        ) : (
          <EyeOpenIcon
            className="h-5 w-5 absolute top-8 -translate-y-1/2 right-2 text-gray-500 cursor-pointer transition-all"
            onClick={() => setShowPassword(!showPassword)}
          />
        ))}
      {searchInput ? (
        <SearchIcon className="h-5 w-5 absolute top-5 -translate-y-1/2 right-4 text-black cursor-pointer transition-all" />
      ) : (
        ""
      )}
      {children}
      {specialCharater ? (
        <p className="absolute top-4 right-4 sm:top-7 sm:right-4 text-gray-400">
          {specialCharater}
        </p>
      ) : (
        ""
      )}
      {maxLength ? (
        maxLength <= value?.length ? (
          <div className="flex gap-x-1 items-center h-max">
            <AlertIcon color="#DC2626" />
            <p className="text-red-600 transition-all my-4 font-CircularStd-Bold">{`Maximum length is ${maxLength} characters`}</p>
          </div>
        ) : (
          ""
        )
      ) : (
        ""
      )}
      {!hideErrors && formik && formik.touched[name] && formik.errors[name] ? (
        <div className="text-theme-red mt-2">
          <>{formik.errors[name]}</>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Input;
