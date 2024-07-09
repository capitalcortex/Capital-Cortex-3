import React, { Fragment, useState } from 'react'
import { Tab } from '@headlessui/react'
type Props = {
    tabClass?: string,
    categories: any,
    dexTab?: any,
}
const Tabs = (props: Props) => {
    return (
        <>
            <Tab.Group className={'chat__history__tabs'} as="div"> 
                <Tab.List as='ul' className={`${props.tabClass ? props.tabClass : 'chat__history__tab__nav'}`}>
                    {props.categories?.map((v: any, k: any) => (
                        <Tab as={'li'} key={k} className={`${props.dexTab ? 'w-full focus:outline-none' : 'focus:outline-none outline-none'}`}>
                            {({ selected }) => (
                                <button className={`${selected ? 'text-gray-575 border-b-4 border-[#eeb127]' : 'text-gray-425'}`}>{v.title}</button>
                            )}
                        </Tab>
                    ))}
                </Tab.List>
                <Tab.Panels className="chat__history__content">
                    {props.categories?.map((item: any, idx: any) => (
                        <Tab.Panel className="focus:outline-none p-2 md:p-5" key={idx}>
                            {item.content}
                        </Tab.Panel>
                    ))}
                </Tab.Panels>
            </Tab.Group>
        </>
    )
}

export default Tabs