import Link from "next/link";
import React from "react";
import { ImSpinner9 } from "react-icons/im";
interface Iprops {
  as?: string;
  htmlFor?: string;
  url?: any;
  children: JSX.Element | string | any;
  className?: string;
  type?: "button" | "reset" | "submit";
  variant?:
  | "black"
  | "gray"
  | "red"
  | "white"
  | "theme"
  | "theme-dark"
  | "transparent"
  | "fixed"
  | "black-border"
  size?: "small" | "medium" | "large";
  onClick?: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
  isLoading?:any
}
const Button = ({
  as,
  url,
  children,
  className,
  type,
  onClick,
  onChange,
  htmlFor,
  size,
  variant,
  disabled,
  isLoading,
}: Iprops) => {
  const sizeStyle = () => {
    switch (size) {
      case "small":
        return "btn-sm";
      case "medium":
        return "btn-md";
      case "large":
        return "btn-lg";
    }
  };
  const variantStyle = () => {
    switch (variant) {
      case "black":
        return "btn-black";
      case "gray":
        return "btn-gray";
      case "red":
        return "btn-red";
      case "theme":
        return "btn-theme";
      case "theme-dark":
        return "btn-theme-dark";
      case "transparent":
        return "btn-transparent";
      case "fixed":
        return "btn-fixed";
      case "black-border":
        return "btn-black-border"
    }
  };
  return (
    <>
      {as === "link" ? (
        <Link
          onClick={onClick}
          href={url} 
          className={`btn ${sizeStyle() || ""} ${variantStyle() || ""} ${className ? className : ""}`}
        >
          {children}
        </Link>
      ) : as == "upload" ? (
        <>
          <label
            htmlFor={htmlFor}
            className={`btn ${sizeStyle() || ""} ${variantStyle() || ""} ${className ? className : ""} cursor-pointer`}
          >
            {children}
          </label>
          <input onChange={onChange} className="hidden" type="file" accept="image/jpeg,image/png,image/jpg" id={htmlFor} />
        </>
      ) : (
        <button
          disabled={disabled}
          onClick={onClick}
          type={type}
          className={`btn ${sizeStyle() || ""} ${variantStyle() || ""} ${className || ""}`}
        >
          {isLoading ? <ImSpinner9 className="animate-spin text-2xl"/>:children}          
        </button>
      )}
    </>
  );
};

export default Button;

