import React, { Fragment, useState } from 'react'
import { FilterIcon } from '../Icons'
import { Dialog, Transition } from '@headlessui/react'
import StakeholderFilters from './StakeholderFilters';
import { useRouter } from 'next/router';
import HomeFilters from './HomeFilters';
import DocumentFilters from './DocumentFilters';


const SearchFilter = ({ }: any) => {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter()

    return (
        <>
            <button
                onClick={() => setIsOpen(true)}
                className='flex bg-theme-gray-50 border border-theme-gray-125 rounded-lg p-3 justify-center items-center focus-visible:outline-none'>
                <FilterIcon />
            </button>
            <Transition show={isOpen} as={Fragment}>
                <Dialog
                    unmount={false}
                    onClose={() => setIsOpen(false)}
                    className="fixed z-50 inset-0"
                >
                    <div className="flex w-full h-screen justify-end">
                        <Transition.Child
                            as={Fragment}
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            entered="translate-x-0"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <Dialog.Overlay className="z-40 fixed inset-0 bg-black opacity-30" />
                        </Transition.Child>
                        <Transition.Child
                            as={Fragment}
                            enter="transition ease-in-out duration-500 transform"
                            enterFrom="translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-500 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="translate-x-full"
                        >
                            <div className="p-8 flex flex-col justify-between bg-white z-100 right-0 w-[20rem] sm:w-[28.5rem]">
                                {router.pathname === '/home' && <HomeFilters setIsOpen={setIsOpen}/>}
                                {router.pathname === '/documents' && <DocumentFilters setIsOpen={setIsOpen}/>}
                                {router.pathname === '/stakeholders' && <StakeholderFilters setIsOpen={setIsOpen}/>}
                            </div>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition>
        </>
    )
}

export default SearchFilter