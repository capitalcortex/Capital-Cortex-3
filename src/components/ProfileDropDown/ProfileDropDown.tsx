import { Dialog, Menu, Transition } from "@headlessui/react";
import Image from "next/legacy/image";
import React, { useState, Fragment } from "react";
import { GoChevronDown } from "react-icons/go";
import { DummyUserIcon, FileIcon, LogoutIcon, SettingIcon } from "../Icons";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "@/redux/slices/userSlice";
const ProfileDropDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { profile } = useSelector((state: any) => state.user);
  const dispatch = useDispatch();
  return (
    <>
      <div className="block sm:hidden">
        <div
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {profile?.avatar ? (
            <figure className="relative h-10 w-10 sm:h-12 sm:w-12">
              <Image
                src={profile.avatar}
                layout="fill"
                alt="user-profile-photo"
                aria-label="user profile photo"
                className="object-cover rounded-full"
              />
            </figure>
          ) : (
            <DummyUserIcon className="relative block h-10 w-10"/>
          )}
        </div>
        <Transition show={isOpen} as={Fragment}>
          <Dialog
            unmount={false}
            onClose={() => setIsOpen(false)}
            className="fixed z-50 inset-0 block sm:hidden"
          >
            <div className="flex w-full h-screen">
              <Transition.Child
                as={Fragment}
                enterFrom="blur-none"
                enterTo="blur-sm"
                entered="blur-sm"
                leaveFrom="blur-sm"
                leaveTo="blur-none"
              >
                <Dialog.Overlay className="z-40 fixed inset-0 backdrop-blur-sm" />
              </Transition.Child>
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-500 transform"
                enterFrom="translate-y-full"
                enterTo="translate-y-0"
                leave="transition ease-in-out duration-500 transform"
                leaveFrom="translate-y-0"
                leaveTo="translate-y-full"
              >
                <div className="bg-white border-t border-gray-200 w-full text-left align-middle shadow-xl rounded-t-2xl absolute bottom-0 h-max z-100 p-6 flex flex-col items-center gap-4">
                  {profile.avatar ? (
                    <figure className="relative h-20 w-20">
                      <Image
                        src={profile?.avatar}
                        layout="fill"
                        alt="user-profile-photo"
                        aria-label="user profile photo"
                        className="object-cover rounded-full"
                      />
                    </figure>
                  ) : (
                    <DummyUserIcon className="relative block h-20 w-20 " />
                  )}
                  {profile?.fullname ? <p className="font-bold">
                    {profile.fullname}
                  </p> : ""}
                  {profile?.email ? <p className="font-bold">
                    {profile.email}
                  </p> : ""}
                  <div className="w-full">
                    <Link
                      onClick={() => {
                        setIsOpen(false);
                      }}
                      href="/settings"
                      className="flex gap-2 items-center focus-visible:outline-none"
                    >
                      <SettingIcon color="#767679" />
                      <p>Settings</p>
                    </Link>
                    <hr className="bg-theme-gray-100 h-[1px] w-full my-3" />
                    <button
                      onClick={() => {
                        //@ts-ignore
                        dispatch(userLogout());
                      }}
                      className="flex gap-2 items-center"
                    >
                      <LogoutIcon color="#D0312D" />
                      <p>Logout</p>
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
      <Menu
        as="div"
        className="relative hidden sm:inline-block text-left z-100"
      >
        <Menu.Button className="btn !min-w-max !p-0">
          {profile.avatar ? (
            <div className="relative h-[44px] w-[44px]">
              <Image
                src={profile.avatar}
                layout="fill"
                alt="user-profile-photo"
                aria-label="user profile photo"
                className="object-cover rounded-full"
              />
            </div>
          ) : (
            <DummyUserIcon className="relative block h-10 w-10" />
          )}
          <GoChevronDown className="text-theme-gray-375 text-lg" />
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
          <Menu.Items className="absolute z-50 right-0 mt-2 w-[17.5rem] origin-top-right bg-white rt-shape shadow-md rounded-lg flex flex-col items-center p-6 gap-4">
            {profile.avatar ? (
              <div className="relative h-20 w-20">
                <Image
                  src={profile.avatar}
                  layout="fill"
                  alt="user-profile-photo"
                  aria-label="user profile photo"
                  className="object-cover rounded-full"
                />
              </div>
            ) : (
              <DummyUserIcon className="relative block h-16 w-16 " />
            )}
            {profile?.fullname ? <p className="text-center font-bold">{profile?.fullname}</p> : ""}
            {profile?.email ? <p className="h5 text-theme-gray-400 text-center">{profile?.email}</p> : ""}
            <div className="w-full">
              <Link
                onClick={() => setIsOpen(false)}
                href="/settings"
                className="flex gap-2 items-center"
              >
                <SettingIcon color="#767679" />
                <p>Settings</p>
              </Link>
              <hr className="bg-theme-gray-100 h-[1px] w-full my-3" />
              <button
                onClick={() => {
                  //@ts-ignore
                  dispatch(userLogout());
                }}
                className="flex gap-2 items-center"
              >
                <LogoutIcon color="#D0312D" />
                <p>Logout</p>
              </button>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  );
};

export default ProfileDropDown;
