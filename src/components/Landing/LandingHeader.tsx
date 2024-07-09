"use-client";
import Image from "next/legacy/image";
import React, { Fragment, useState, useEffect } from "react";
import Button from "@/components/Buttons/Button";
import { FileIcon } from "@/components/Icons";
import { useRouter } from "next/router";
import ProfileDropDown from "@/components/ProfileDropDown/ProfileDropDown";
import { Dialog, Transition } from "@headlessui/react";
import MenuButton from "../ProfileDropDown/MenuButton";
import Link from "next/link";
import BetaVersionBar from "../Beta/BetaVersionBar";
import NiceModal from "@ebay/nice-modal-react";
import CreateNewPlan from "../Modals/CreateNewDocumentModal/CreateNewDocumentModal";
import { BeforeAuth } from "@/services/beforeAuthRoutes.service";
import ls from "localstorage-slim";
const LandingHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [isScrollAtTop, setIsScrollAtTop] = useState(true); 
  useEffect(() => {
    let scrolling: boolean;
    let position = 0;
    const delta = 5;
    const headerElement = document.querySelector("header") as HTMLElement;
    const hh = headerElement.offsetHeight;
    const dh = document.documentElement.scrollHeight;
    const wh = window.innerHeight;
    window.addEventListener("scroll", function () {
      scrolling = true;
    });
    setInterval(function () {
      if (scrolling) {
        scrollFunction();
        scrolling = false;
      }
    }, 250);
    function scrollFunction() {
      const st = window.scrollY || document.documentElement.scrollTop;

      if (Math.abs(position - st) <= delta) {
        return;
      }

            if (headerElement) {
                if (st > position && st > hh) {
                    headerElement.classList.remove('scroll-down');
                    headerElement.classList.add('scroll-up');
                } else {
                    if (st + wh < dh) {
                        headerElement.classList.remove('scroll-up');
                        headerElement.classList.add('scroll-down');
                    }
                }
                position = st;
            }
        }
        const handleScroll = () => {
            var scrollPosition = window.scrollY
            setIsScrollAtTop(scrollPosition === 0)
        }
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [])
    const token = !(ls.get("access_token", { decrypt: true }))
    return (
        <>
            <header id="header" className={`landing__header ${token ? "bg-theme-gray-575 z-100" : "border-b border-theme-gray-100 z-10"} ${isScrollAtTop ? "bg-opacity-70 backdrop-blur-md" : ""}`}>
                {/* {token ? <BetaVersionBar /> : ""} */}
                <div className={`${token ? "main-container py-3" : "theme-container py-3 md:py-0"} flex items-center justify-between`}>
                    <Link href={`${token ? "/" : "/home"}`} className="leading-1 relative w-28 h-12 lg:w-36 lg:h-14">
                        <figure className="w-full h-full">
                            <Image layout="fill" placeholder="blur" blurDataURL={`https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-${token ? "white" : "black"}.svg`} src={`https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-${token ? "white" : "black"}.svg`} alt="capital cortex logo" aria-label="capital cortex company logo" />
                        </figure>
                    </Link>
                    <nav id="nav" className={`nav ${!token ? "layoutNav" : ""}`}>
                        {token ?
                            <ul className="hidden md:flex gap-8 lg:gap-14">
                                <li className={`${router.asPath === "/#about" ? "activeNav" : ""}`}><Link href="/#about">About Us</Link></li>
                                <li className={`${router.asPath === "/#vision" ? "activeNav" : ""}`}><Link href="/#vision">Vision</Link></li>
                                <li className={`${router.asPath === "/#features" ? "activeNav" : ""}`}><Link href="/#features">Features</Link></li>
                                <li className={`${router.asPath === "/#advisory" ? "activeNav" : ""}`}><Link href="/#advisory">Advisory Board</Link></li>
                            </ul> :
                            <ul>
                                <li className={`${router.pathname === "/home" ? "activeNav" : ""}`} >
                                    <Link href="/home">Home</Link>
                                </li>
                                <li className={`${router.pathname === "/ai-assistant" ? "activeNav" : ""}`}>
                                    <Link href="/ai-assistant">AI Assistant</Link>
                                </li>
                                <li className={`${router.pathname.includes('documents') ? "activeNav" : ""}`}>
                                    <Link href="/documents">Documents</Link>
                                </li>
                                <li className={`${router.pathname === "/stakeholders" ? "activeNav" : ""}`}>
                                    <Link href="/stakeholders">Stakeholders</Link>
                                </li>
                            </ul>
                        }
                    </nav>
                    <div className="flex items-center gap-4">
                        {!token ? <div className="flex items-center gap-10">
                            <Button disabled={false} onClick={() => NiceModal.show(CreateNewPlan, { hideCloseButton: true })} size="small" variant="black" className="hidden md:flex btn !min-w-max !px-5 !py-3 fs-16 leading-1">
                                <span>
                                    Create Document
                                </span>
                                <FileIcon color="white" />
                            </Button>
                            <ProfileDropDown />
                        </div> :
                            <Button as="link" url="/register" size="medium" variant="transparent" className="text-white hidden md:flex !rounded-none">Get Started</Button>
                        }
                        <div className="block md:hidden">
                            <MenuButton open={isOpen} setOpen={setIsOpen} />
                            <Transition show={isOpen} as={Fragment}>
                                <Dialog unmount={false} onClose={() => setIsOpen(false)} className="fixed z-50 inset-0">
                                    <div className="flex w-full h-screen">
                                        <Transition.Child as={Fragment} enterFrom="blur-none" enterTo="blur-sm" entered="blur-sm" leaveFrom="blur-sm" leaveTo="blur-none">
                                            <Dialog.Overlay className="z-40 fixed inset-0 backdrop-blur-sm" />
                                        </Transition.Child>
                                        <Transition.Child as={Fragment} enter="transition ease-in-out duration-500 transform" enterFrom="translate-y-full" enterTo="translate-y-0" leave="transition ease-in-out duration-500 transform" leaveFrom="translate-y-0" leaveTo="translate-y-full">
                                            <nav className={`${token ? "landingHeader__nav__mobile" : "layoutHeader__nav__mobile"} `}>
                                                {token ? <ul className="landingHeader__nav__ul">
                                                    <li className={`${router.asPath === "/#about" ? "text-theme" : ""}`}>
                                                        <Link onClick={() => setIsOpen(!isOpen)} href="#about">About Us</Link>
                                                    </li>
                                                    <li className={`${router.asPath === "/#vision" ? "text-theme" : ""}`}>
                                                        <Link onClick={() => setIsOpen(!isOpen)} href="#vision">Vision</Link>
                                                    </li>
                                                    <li className={`${router.asPath === "/#features" ? "text-theme" : ""}`}>
                                                        <Link onClick={() => setIsOpen(!isOpen)} href="#features">Features</Link>
                                                    </li>
                                                    <li className={`${router.asPath === "/#advisory" ? "text-theme" : ""}`}>
                                                        <Link onClick={() => setIsOpen(!isOpen)} href="#advisory">Advisory Board</Link>
                                                    </li>
                                                    <li>
                                                        <Button as="link" onClick={() => setIsOpen(!isOpen)} url="/register" className="border w-full text-center block py-3" variant="black">Get Started</Button>
                                                    </li>
                                                </ul> :
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
                                                                AI Assistant
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <span
                                                                className={`${router.pathname === "/projects" ? "activeNav" : ""}`}
                                                            ></span>
                                                            <Link onClick={() => setIsOpen(!isOpen)} href="/documents">
                                                                 Documents
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
                                                            Create Document
                                                            <FileIcon color="white " />
                                                        </Button>
                                                    </ul>
                                                }
                                            </nav>
                                        </Transition.Child>
                                    </div>
                                </Dialog>
                            </Transition>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default LandingHeader;
