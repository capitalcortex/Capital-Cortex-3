import Image from "next/legacy/image";
import React, { Fragment, useEffect, useState } from "react";
import Button from "@/components/Buttons/Button";
import { FileIcon } from "@/components/Icons";
import { useRouter } from "next/router";
import ProfileDropDown from "@/components/ProfileDropDown/ProfileDropDown";
import { Dialog, Transition } from "@headlessui/react";
import MenuButton from "../ProfileDropDown/MenuButton";
import Link from "next/link";
import NiceModal from "@ebay/nice-modal-react";
import CreateNewPlan from "../Modals/CreateNewDocumentModal/CreateNewDocumentModal";
const LayoutHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  return (
    <header id="layoutHeader" className="layoutHeader">
      <div className="layoutHeader__container">
        <Link href="/home">
          <Image layout="fill" placeholder="blur" blurDataURL="https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-black.svg" src="https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-black.svg" alt="capital cortex logo" aria-label="capital cortex company logo" />
        </Link>
        <nav id="layoutHeader__nav" className="layoutHeader__nav">
          <ul>
            <li className={`${router.pathname === "/home" ? "activeNav" : ""}`}>
              <Link href="/home">Home</Link>
            </li>
            <li className={`${router.pathname === "/ai-assistant" ? "activeNav" : ""}`}>
              <Link href="/ai-assistant">Chat</Link>
            </li>
            <li className={`${router.pathname === "/projects" ? "activeNav" : ""}`}>
              <Link href="/projects">Projects</Link>
            </li>
            <li className={`${router.pathname === "/stakeholders" ? "activeNav" : ""}`}>
              <Link href="/stakeholders">Stakeholders</Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          <Button disabled={false} onClick={() => NiceModal.show(CreateNewPlan, { hideCloseButton: true })} size="small" variant="black" className="hidden md:flex btn !min-w-max !p-2 fs-16 leading-1">
            <span>
              Create New
            </span>
            <FileIcon color="white" />
          </Button>
          <ProfileDropDown />
          <MenuButton open={isOpen} setOpen={setIsOpen} />
          <Transition show={isOpen} as={Fragment}>
            <Dialog
              unmount={false}
              onClose={() => setIsOpen(false)}
              className="fixed z-50 inset-0"
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
                  <nav className="layoutHeader__nav__mobile">
                    <ul>
                      <li>
                        <span
                          className={`${router.pathname === "/home" ? "activeNav" : ""}`}
                        ></span>
                        <Link
                          onClick={() => setIsOpen(!isOpen)}
                          href="/home"
                        >
                          Home
                        </Link>
                      </li>
                      <li>
                        <span
                          className={`${router.pathname === "/ai-assistant" ? "activeNav" : ""}`}
                        ></span>
                        <Link onClick={() => setIsOpen(!isOpen)} href="/ai-assistant">
                          Chat
                        </Link>
                      </li>
                      <li>
                        <span
                          className={`${router.pathname === "/projects" ? "activeNav" : ""}`}
                        ></span>
                        <Link onClick={() => setIsOpen(!isOpen)} href="/projects">
                          Projects
                        </Link>
                      </li>
                      <li>
                        <span
                          className={`${router.pathname === "/stakeholders" ? "activeNav" : ""}`}
                        ></span>
                        <Link onClick={() => setIsOpen(!isOpen)} href="/stakeholders">
                          Stakeholders
                        </Link>
                      </li>
                      <Button 
                        onClick={() =>
                          NiceModal.show(CreateNewPlan, {
                            hideCloseButton: true,
                          })
                        }
                        variant="black"
                        size="small"
                        className="w-full"
                      >
                        Create New
                        <FileIcon color="white " />
                      </Button>
                    </ul>
                  </nav>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </div>
      </div>
    </header>

  );
};

export default LayoutHeader;
