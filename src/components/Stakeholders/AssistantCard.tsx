import React, { Fragment } from "react";
import { Menu, Tab, Transition } from "@headlessui/react";
import { useDispatch } from "react-redux";
import { ArrowLeftIcon, CloseIcon, CopyIcon, DownArrowIcon, PlusIcon } from "../Icons";
import Toast from "../Toast";

interface Iprops {
  key?: any;
  isOpen?: boolean;
  setIsOpen?: any;
  isDetailOpen?: boolean;
  setIsDetailOpen?: any;
  details?: any;
}

const AssistantCard = ({
  key,
  details,
}: Iprops) => {
  const dispatch = useDispatch();

  const handleCopy = (text: string) => {
    window.navigator.clipboard.writeText(text);
    Toast.fire({
      icon: "success",
      title: "Copied to Clipboard",
    });
  };

  return (
    <div key={key} className="stakeholder__panel__container">
      <div className="stakeholder__detail">
        <p className="text-left">Person</p>
        <p className="text-center">Email</p>
        <p className="text-right">Phone</p>
      </div>
        <div className="stakeholder__contact__detail">
          <h4 className="stakeholder__contact__h4">
            {details?.fullname}&nbsp;
            { details?.designation != '' &&
              <span className="stakeholder__contact__span">
                ({details?.designation})
              </span>
            }
          </h4>
          <Menu as={"div"} className={"relative "}>
            <Menu.Button as={"button"} disabled={details?.emails.length == 0} className={"stakeholder__menu__btn"}>
              <p className="">{details?.emails[0]}</p>
              <DownArrowIcon color="black" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items as={"ul"} className={"stakeholder__menu__ul"}>
                {details?.emails.map((email: any, index: number) => (
                  <Menu.Item key={index} as={"li"} className={"stakeholder__menu__li"}>
                    <span className="stakeholder__email__span">{email}</span>
                    <button onClick={() => handleCopy(email)}>
                      <CopyIcon width={16} height={16} color={"#A3A4A6"} />
                    </button>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
          <Menu as={"div"} className={"relative "}>
            <Menu.Button as={"button"} disabled={details?.phone_numbers.length == 0} className={"stakeholder__menu__btn"}>
              <p className="">{details?.phone_numbers[0]}</p>
              <DownArrowIcon color="black" />
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items as={"ul"} className={"stakeholder__menu__ul"}>
                {details?.phone_numbers.map((number: any, index: number) => (
                  <Menu.Item key={index} as={"li"} className={"stakeholder__menu__li"}>
                    <span className="stakeholder__email__span">{number}</span>
                    <button onClick={() => handleCopy(number)}>
                      <CopyIcon width={16} height={16} color={"#A3A4A6"} />
                    </button>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Transition>
          </Menu>
        </div>
    </div>
  );
};

export default AssistantCard;
