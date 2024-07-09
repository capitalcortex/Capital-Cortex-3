// import React, { useState } from "react";
// import Select, { OptionProps, components } from "react-select";
// import { DownArrowIcon, PlusIcon } from "../Icons";
// import { FormikProps } from "formik";
// import { useRouter } from "next/router";
// interface Iprops {
//   instanceId?: string;
//   values: any;
//   placeholder: string;
//   isMulti?: boolean;
//   className?: string;
//   label?: any;
//   value?: any;
//   parentClass?: string;
//   setChange?: any;
//   formik?: FormikProps<any>;
//   name?: any;
//   isBoolean?: boolean;
//   setSelectedFilters?: any;
//   editableInput?:boolean;
//   onChange?: any;
// }

// function MultiSelect({
//   instanceId,
//   name,
//   parentClass,
//   setChange,
//   className,
//   value,
//   values,
//   placeholder,
//   isMulti,
//   label,
//   formik,
//   setSelectedFilters,
//   editableInput,
//   onChange
// }: Iprops) {
//   let allSelected: any[] = []
//   const [showInput, setShowInput] = useState(false);
//   const [inputValue, setInputValue] = useState("");
//   const handleChange = (selected: any) => {
//     if (setChange) setChange(true);
//     if (isMulti) {
//       // Assuming selected is an array of objects with 'value' key
//       const values = selected.map((item: any) => item.value);
//       formik?.setFieldValue(name, values);
//     } else {
//       // console.log(name, selected);
//       // For single select
//       formik?.setFieldValue(name, selected.value);
//     }
//     allSelected.push(selected)
//     if (setSelectedFilters) {
//       setSelectedFilters(allSelected)
//     }
//   };
//   const router = useRouter()
//   const handleToggleInput = () => {
//     if (router.asPath === '/settings') {
//       setShowInput(!showInput);
//     }
//   };
//   const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setInputValue(event.target.value); 
//   };
//   const InputOption = ({
//     getStyles,
//     isDisabled,
//     isFocused,
//     isSelected,
//     children,
//     innerProps,
//     ...rest
//   }: OptionProps) => {
//     const [isActive, setIsActive] = useState(false);
//     const onMouseDown = () => setIsActive(true);
//     const onMouseUp = () => setIsActive(false);
//     const onMouseLeave = () => setIsActive(false);
//     const props = {
//       ...innerProps,
//       onMouseDown,
//       onMouseUp,
//       onMouseLeave,
//     };

//     return (
//       <components.Option
//         className="!flex items-center gap-2"
//         isDisabled={isDisabled}
//         isFocused={isFocused}
//         isSelected={isSelected}
//         getStyles={getStyles}
//         innerProps={innerProps}
//         {...rest}
//       >
//         {isMulti ? (
//           <label
//             aria-label=""
//             htmlFor="checkbox"
//             className="cursor-pointer checkbox-label"
//           >
//             <input
//               readOnly={true}
//               checked={isSelected}
//               type="checkbox"
//               name="checkbox"
//               id="checkbox"
//               className="sr-only"
//             />
//             <span className="rounded-md h-5 w-5 flex justify-center items-center bg-theme-gray-75">
//               <svg
//                 className="tick"
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="12"
//                 height="8"
//                 viewBox="0 0 12 8"
//                 fill="none"
//               >
//                 <path
//                   d="M10.6663 0.791626L4.24967 7.20829L1.33301 4.29163"
//                   stroke="#F4F4F4"
//                   strokeWidth="1.5"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                 />
//               </svg>
//             </span>
//           </label>
//         ) : (
//           ""
//         )}
//         {children}
//       </components.Option>
//     );
//   };
//   return (
//     <div className={`relative ${parentClass}`}>
//       {showInput ? (
//         <input
//           type="text"
//           value={inputValue}
//           onChange={handleInputChange}
//           placeholder={`Enter ${placeholder}`}
//           className={`w-full ${className} h-full py-4 px-6 !pr-0  border rounded-lg focus:outline-none`}
//         />
//       ) : (
//         <Select
//           instanceId={instanceId}
//           components={{
//             Option: InputOption,
//           }}
//           value={value?.label != '' ? value : undefined}
//           onChange={formik ? handleChange : onChange}
//           options={values}
//           name={name}
//           isMulti={isMulti ? isMulti : false}
//           placeholder={placeholder}
//           className={`w-full ${className} h-full`}
//           hideSelectedOptions={false}
//           classNamePrefix={"category"}
//         />
//       )}
//       {label}
//       <span className={`absolute -z-10 top-3.5 ${router.asPath=== "/settings" ?"right-6":"right-3"}`}>
//         <DownArrowIcon />
//       </span>
//       {editableInput &&  <span className="absolute right-1 top-3.5" onClick={handleToggleInput}>
//         <PlusIcon color="#A3A4A6" />
//       </span>
//       }
//       {typeof formik?.errors[name] === "string" && formik?.errors[name] ? (
//         <div className="text-theme-red absolute mb-4 top-[54px] text-sm left-2">
//           <>{formik.errors[name]}</>
//         </div>
//       ) : (
//         ""
//       )}
//     </div>
//   );
// }

// export default MultiSelect;

import React, { useState } from "react";
import Creatable from 'react-select/creatable';
import Select, { OptionProps, components } from "react-select";
import { DownArrowIcon, PlusIcon } from "../Icons";
import { FormikProps } from "formik";
import { useRouter } from "next/router";

interface Iprops {
  instanceId?: string;
  values: any;
  placeholder: string;
  isMulti?: boolean;
  className?: string;
  label?: any;
  value?: any;
  parentClass?: string;
  setChange?: any;
  formik?: FormikProps<any>;
  name?: any;
  isBoolean?: boolean;
  setSelectedFilters?: any;
  editableInput?: boolean;
  onChange?: any;
}

function MultiSelect({
  instanceId,
  name,
  parentClass,
  setChange,
  className,
  value,
  values,
  placeholder,
  isMulti,
  label,
  formik,
  setSelectedFilters,
  editableInput,
  onChange
}: Iprops) {
  const [showInput, setShowInput] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const handleChange = (selected: any) => {
    if (setChange) setChange(true);
    if (isMulti) {
      const values = selected ? selected.map((item: any) => item.value) : [];
      formik?.setFieldValue(name, values);
    } else {
      formik?.setFieldValue(name, selected ? selected.value : "");
    }
    if (setSelectedFilters) {
      setSelectedFilters(selected);
    }
  };

  const router = useRouter();

  const handleToggleInput = () => {
    if (router.asPath === '/settings') {
      setShowInput(!showInput);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const InputOption = ({
    getStyles,
    isDisabled,
    isFocused,
    isSelected,
    children,
    innerProps,
    ...rest
  }: OptionProps) => {
    return (
      <components.Option
        className="!flex items-center gap-2"
        isDisabled={isDisabled}
        isFocused={isFocused}
        isSelected={isSelected}
        getStyles={getStyles}
        innerProps={innerProps}
        {...rest}
      >
        {isMulti && (
          <label
            aria-label=""
            htmlFor="checkbox"
            className="cursor-pointer checkbox-label"
          >
            <input
              readOnly={true}
              checked={isSelected}
              type="checkbox"
              name="checkbox"
              id="checkbox"
              className="sr-only"
            />
            <span className="rounded-md h-5 w-5 flex justify-center items-center bg-theme-gray-75">
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
                  stroke="#F4F4F4"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </label>
        )}
        {children}
      </components.Option>
    );
  };

  return (
    <div className={`relative ${parentClass}`}>
      {showInput ? (
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder={`Enter ${placeholder}`}
          className={`w-full ${className} h-full py-4 px-6 !pr-0 border rounded-lg focus:outline-none`}
        />
      ) : (
        <Creatable
          instanceId={instanceId}
          components={{
            Option: InputOption,
          }}
          value={value?.label !== '' ? value : undefined}
          onChange={formik ? handleChange : onChange}
          options={values}
          name={name}
          isMulti={isMulti || false}
          placeholder={placeholder}
          className={`w-full ${className} h-full`}
          hideSelectedOptions={false}
          classNamePrefix="category"
        />
      )}
      {label}
      <span className={`absolute -z-10 top-3.5 ${router.asPath === "/settings" ? "right-6" : "right-3"}`}>
        <DownArrowIcon />
      </span>
      {editableInput && (
        <span className="absolute right-1 top-3.5" onClick={handleToggleInput}>
          <PlusIcon color="#A3A4A6" />
        </span>
      )}
      {formik?.errors[name] && typeof formik.errors[name] === "string" && (
        <div className="text-theme-red absolute mb-4 top-[54px] text-sm left-2">
           <>{formik.errors[name]}</>
        </div>
      )}
    </div>
  );
}

export default MultiSelect;

