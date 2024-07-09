import React, { Fragment, useState, useEffect } from "react";
import {
  ArrowLeftIcon,
  CloseIcon,
  CopyIcon,
  DownArrowIcon,
  DummyUserIcon,
  PlusIcon,
} from "../Icons";
import { Menu, Tab, Transition } from "@headlessui/react";
import dummyUser from "../../../public/images/dummy/dummy-user.jpg";
import NiceModal from "@ebay/nice-modal-react";
import Image from "next/image";
import AddStakeholderEmployee from "../Modals/AddStakeholderEmployee/AddStakeholderEmployee";
import TouchpointCard from "./TouchpointCard";
import AddNote from "../Modals/AddNote/AddNote";
import AddTouchPoint from "../Modals/AddTouchPoint/AddTouchPoint";
import { useSelector } from "react-redux";
import AssistantCard from "./AssistantCard";
import Toast from "../Toast";

interface Iprops {
  isOpen: boolean;
  setIsOpen: Function;
}
const StakeholderDetails = ({ isOpen, setIsOpen }: Iprops) => {
  const { stakeholderDetails } = useSelector((state: any) => state.stakeholder);
  const tabs = [
    { title: "overview" },
    { title: "notes" },
    { title: "touchpoints" },
  ];
  const handleCopy = (text: string) => {
    window.navigator.clipboard.writeText(text);
    Toast.fire({
      icon: "success",
      title: "Copied to Clipboard",
    });
  };
  return (
    <>
     <div
      className={`${
        isOpen ? "z-100 h-full w-full top-0 right-0" : ""
      } absolute`}
    >
      {isOpen ? (
        <div
          onClick={() => setIsOpen(!isOpen)}
          className="stakeholder__inset"
        ></div>
      ) : (
        ""
      )}
      <div
        className={`stakeholder__detail__container ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {
      Object.keys(stakeholderDetails).length > 0 &&
        <>
        <div className="stakeholder__info">
          {
            stakeholderDetails?.profile_picture == '' ? (
              <DummyUserIcon className="h-14 w-14" />
            ) : (
              <figure className="stakeholder__info__img">
                <Image
                  unoptimized
                  id="stakeholder_picture"
                  src={stakeholderDetails?.profile_picture}
                  alt="stakeholder photo"
                  layout="fill"
                  placeholder="blur"
                  blurDataURL={stakeholderDetails?.profile_picture}
                  className="!w-18 !h-18 rounded-full md:!h-12 md:!w-12 !relative"
                />
              </figure>
            )
          }
          <div>
            <h2 className="stakeholder__info__heading">
              {stakeholderDetails?.fullname}
            </h2>
            <p className={`stakeholder__info__para`}>
              {stakeholderDetails.department}
              <span className="stakeholder__info__dot">
                {stakeholderDetails?.country}
                {stakeholderDetails?.state != '' && ` (${stakeholderDetails?.state})`}
              </span>
            </p>
          </div>
        </div>
        <Tab.Group as={"div"} className={"stakeholder__tabs_container"}>
          <Tab.List as={"div"} className="stakeholder__tabs_list">
            {tabs.map((tab, i) => (
              <Tab
                key={i}
                className={({ selected }: any) =>
                  `stakeholder__tabs ${
                    selected
                      ? "border-theme text-theme-gray-575"
                      : "border-transparent text-theme-gray-400"
                  }`
                }
              >
                {tab.title}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels as={"div"} className={"px-4 pb-4 sm:px-8 sm:pb-8"}>
            <Tab.Panel>
              <h3 className="stakeholder__panel_h3">Bio/About</h3>
              <p className="stakeholder__panel_para">
                {stakeholderDetails?.bio}
              </p>
              <h3 className="stakeholder__contact__h3">Contact Information</h3>
              <div className="stakeholder__panel__container">
                <div className="stakeholder__detail">
                  <p className="text-left">Person</p>
                  <p className="text-center">Email</p>
                  <p className="text-right">Phone</p>
                </div>
                <div className="stakeholder__contact__detail">
                  <h4 className="stakeholder__contact__h4">
                    {stakeholderDetails?.fullname}&nbsp;
                    {stakeholderDetails?.designation != '' && <span className="stakeholder__contact__span">
                      ({stakeholderDetails?.designation})
                    </span>}
                  </h4>
                  <Menu as={"div"} className={"relative "}>
                    <Menu.Button
                      as={"button"}
                      className={"stakeholder__menu__btn"}
                      disabled={stakeholderDetails?.emails.length == 0}
                    >
                      <p className="truncate">{stakeholderDetails?.emails[0]}</p>
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
                        {stakeholderDetails?.emails.map((email: any, index: number) => (
                          <Menu.Item
                            key={index}
                            as={"li"}
                            className={"stakeholder__menu__li"}
                          >
                            <span className="stakeholder__email__span">
                              {email}
                            </span>
                            <button onClick={() => handleCopy(email)}>
                              <CopyIcon
                                width={16}
                                height={16}
                                color={"#A3A4A6"}
                              />
                            </button>
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                  <Menu as={"div"} className={"relative "}>
                    <Menu.Button
                      as={"button"}
                      className={"stakeholder__menu__btn"}
                      disabled={stakeholderDetails?.phone_numbers.length == 0}
                    >
                      <p className="">{stakeholderDetails?.phone_numbers[0]}</p>
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
                        {stakeholderDetails?.phone_numbers.map((number: any, index: number) => (
                          <Menu.Item
                            as={"li"}
                            key={index}
                            className={"stakeholder__menu__li"}
                          >
                            <span className="stakeholder__email__span">
                              {number}
                            </span>
                            <button onClick={() => handleCopy(number)}>
                              <CopyIcon
                                width={16}
                                height={16}
                                color={"#A3A4A6"}
                              />
                            </button>
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
              <div className="stakeholder__contact__banner">
                <p className="">Secretaries/Assistants</p>
                <button onClick={() => NiceModal.show(AddStakeholderEmployee, {type: 'assistant'})}>
                  <PlusIcon />
                </button>
              </div>
              {stakeholderDetails?.assistants?.map(
                (details: any, index: number) => (
                  <AssistantCard key={index} details={details} />
                )
              )}
              <div className="stakeholder__contact__banner">
                <p className="">Advisor</p>
                <button onClick={() => NiceModal.show(AddStakeholderEmployee, {type: 'advisor'})}>
                  <PlusIcon />
                </button>
              </div>
              {stakeholderDetails?.advisors?.map(
                (details: any, index: number) => (
                  <AssistantCard key={index} details={details} />
                )
              )}
            </Tab.Panel>
            <Tab.Panel>
              <h3 className="stakeholder__panel_h3">Bio/About</h3>
              <p className="stakeholder__panel_para">
                {stakeholderDetails?.bio}
              </p>
              <div className="stakeholder__notes__banner">
                <h3 className="stakeholder__panel_h3">Notes</h3>
                <button onClick={() => NiceModal.show(AddNote)}>
                  <PlusIcon />
                </button>
              </div>
              <ul className="trendingsNews flex flex-col gap-2">
                {stakeholderDetails?.notes.map((ele: any, i: number) => (
                  <TouchpointCard type="note" key={i} stakeId={stakeholderDetails?._id} details={ele} />
                ))}
              </ul>
            </Tab.Panel>
            <Tab.Panel>
              <h3 className="stakeholder__panel_h3">Bio/About</h3>
              <p className="stakeholder__panel_para">
                {stakeholderDetails?.bio}
              </p>
              <div className="stakeholder__notes__banner">
                <h3 className="stakeholder__panel_h3">Touchpoints</h3>
                <button onClick={() => NiceModal.show(AddTouchPoint)}>
                  <PlusIcon />
                </button>
              </div>
              <ul className="stakeholder__touchpoints__grid">
                {stakeholderDetails?.touch_points.map((ele: any, i: number) => (
                  <TouchpointCard type="touch_point" stakeId={stakeholderDetails?._id} key={i} details={ele} />
                ))}
              </ul>
            </Tab.Panel>
          </Tab.Panels>
        </Tab.Group>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="absolute top-2 right-2"
        >
          <CloseIcon className="w-7 h-7 " fill="white" stroke="black" />
        </button>
        </>
}
      </div>
    </div>
    
    </>
  );
};

export default StakeholderDetails;
