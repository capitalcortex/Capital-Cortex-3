import { FormikProps } from "formik";
import React from "react";
import ReactTextareaAutosize from "react-textarea-autosize";
interface Iprops {
  name?: any;
  formik?: FormikProps<any>;
  id?: string;
  parentClass?: string;
  placeholder?: string;
  rows?: number;
  className?: string;
  autoResize?: Boolean;
  value?: string;
  labelClass?: string;
  onKeyDown?: any;
  onChange?: any;
  children?:any;
  disabled?:any;
  onblur?:any
}
const Textarea = ({
  name,
  formik,
  id,
  parentClass,
  className,
  placeholder,
  rows,
  autoResize,
  value,
  labelClass,
  onKeyDown,
  onChange,
  disabled,
  children,
  onblur
}: Iprops) => {
  return (
    <div className={`relative ${parentClass ? parentClass : ""}`}>
      {autoResize ? (
        <ReactTextareaAutosize
        autoFocus
          onChange={onChange}
          onKeyDown={onKeyDown}
          rows={rows ? rows : 4}
          id={id}
          placeholder=" "
          value={value}
          disabled={disabled}
          className={`theme-input peer resize-none ${className ? className : ""}`}
        />
      ) : (
        <textarea
        // autoFocus
          placeholder=" "
          id={id}
          rows={rows}
          name={name}
          disabled={disabled}
          value={formik ? formik.values[name] : value}
          onBlur={formik ? formik?.handleBlur : onblur}
          onInput={formik ? formik?.handleBlur : onblur}
          onChange={formik ? formik?.handleChange : onChange}
          className={`theme-input peer resize-none ${className ? className : ""} !h-auto`}
        ></textarea>
      )}
      {placeholder ? (
        <label
          htmlFor={id}
          className={`${autoResize ? "" : "peer-placeholder-shown:top-6 peer-focus:top-2"
            } theme-input-label ${labelClass ? labelClass : ""}`}
        >
          {placeholder}
        </label>
      ) : (
        ""
      )}
      {formik && formik.touched[name] && formik.errors[name] ? (
        <div className="text-theme-red mt-2">
          <>{formik.errors[name]}</>
        </div>
      ) : (
        ""
      )}
      {children}
    </div>
  );
};

export default Textarea;
