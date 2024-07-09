import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { CloseIcon } from "../Icons";
interface Iprops {
  id?: string;
  className?: string;
  children: JSX.Element;
  show: boolean;
  hide: Function;
  hideCloseButton?: any;
  overlayClass?: string;
  parentClass?: string;
  nestedModal?: boolean;
  modalClass?:string
}

export default function Modal({
  id,
  show,
  hide,
  children,
  className,
  hideCloseButton,
  overlayClass,
  parentClass,
  nestedModal,
  modalClass
}: Iprops) {
  const modalCloseHandler = () => {
    hide(false);
  };

  return (
    <div className={`${modalClass} fixed z-100 inset-0 overflow-x-hidden overflow-y-auto ${show ? "flex" : "hidden"} justify-center items-center`}>
      <div className={`${parentClass ? parentClass : ""} flex sm:block fixed z-[200] items-center justify-center p-4 sm:p-0`}>
        <div className={`fixed inset-0 ${overlayClass ? overlayClass : "bg-[rgba(0,0,0,0.8)]"}`}></div>
        <span className="hidden h-full relative" aria-hidden="true">&#8203;</span>
        <div className={`bg-white rounded-xl shadow-xl transform transition-all h-full grow ${className ? className : ""}`}>
          {hideCloseButton ? null : (
            <button type="button" className="absolute !right-5 !top-5 text-xl hover:text-gray-500 cross focus:outline-none z-100" onClick={modalCloseHandler}>
              <span className="sr-only">Close</span>
              <CloseIcon fill="white" stroke="black" className="text-theme-gray-575 h-7 md:h-5 w-7 md:w-5" />
            </button>
          )}
          {children}
        </div>
      </div>
    </div>

  );
}
