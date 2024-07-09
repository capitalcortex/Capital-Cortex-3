import React, { Fragment, useEffect, useState } from 'react'
import { Menu, Tab, Transition } from '@headlessui/react'
import NewsCard from './NewsCard'
import Button from '../Buttons/Button'
import { motion, AnimatePresence } from "framer-motion";
import { DownArrowIcon } from '../Icons'
import Pagination from '../Pagination'


const UpdatesSection = ({news}: any) => {
    const [activeTab, setActiveTab] = useState(Object.keys(news)[0]);
    const [page, setPage] = useState(1)
    const handleFilter = (tab: string) => {
        setActiveTab(tab)
    }

    return (
        <div className={"updatesNews"}>
            <div className="flex items-center justify-between mb-6">
                <h2 className='h2 font-bold'>Updates & News</h2>
                <Menu as={"div"} className={"relative flex justify-end md:hidden"}>
                    <Menu.Button as={Fragment}>
                        <Button variant="black" size="small" className='updatesNews__dropdown'>
                            {activeTab}
                            <DownArrowIcon color="white" />
                        </Button>
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
                        <Menu.Items as="ul" className="flex flex-col gap-2 p-5 absolute right-0 top-9 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                            {Object.keys(news).map((tab: any, i: any) => (
                                <Menu.Item key={i} as={"li"} onClick={() => handleFilter(tab)}>
                                    <Button
                                        variant={tab === activeTab ? "black" : "gray"}
                                        size='small'
                                    >
                                        {tab}
                                    </Button>
                                </Menu.Item>
                            ))}
                        </Menu.Items>
                    </Transition>
                </Menu>
            </div>
            <ul className="hidden md:flex gap-2 sm:gap-4 flex-wrap mb-8">
                {Object.keys(news).map((tab, i) => (
                    <li onClick={() => handleFilter(tab)} key={i} className="focus-visible:outline-none">
                        <Button
                            variant={tab === activeTab ? "black" : "gray"}
                            size='small'
                            className='btn !min-w-max !rounded font-semibold !px-4 !py-1'
                        >{tab}</Button>
                    </li>
                ))}
            </ul>

            <motion.div layout className="grid sm:grid-cols-2 gap-4">
                <AnimatePresence>
                    <NewsCard newsDetails={news[activeTab]} page={page} />
                </AnimatePresence>
            </motion.div>
            <div className='flex gap-2 flex-wrap justify-center mt-14'>
                <Pagination newsDetails={news[activeTab]} page={page} setPage={setPage}/>
            </div>
        </div>
    )
}
export default UpdatesSection