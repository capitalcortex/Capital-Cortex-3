import { Tab } from '@headlessui/react'
import React from 'react'
import ChatBox from '../Chat/ChatBox' 
import Notes from '../Chat/Notes'

const EditChatBox = () => {
  const tabs = [
    { title: "Chat" },
    { title: "Notes" },
]
  return ( 
      <Tab.Group as={'div'}>
        <Tab.List as={'div'} className="flex px-6 border-b border-theme-gray-125 overflow-y-scroll mb-4 scrollbar-hidden">
          {tabs.map((tab, i) => (
            <Tab as={"div"} className={"focus-visible:outline-none cursor-pointer"} key={i}>
              {({ selected }: any) => (
                <p className={`${selected ? "border-b-4 border-theme text-theme-gray-575" : "text-theme-gray-400"} font-semibold text-xs sm:text-base mr-4 sm:mr-8 py-4 w-max focus-visible:outline-none whitespace-nowrap capitalize`}>{tab.title}</p>
              )}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panel className='pb-0 xl:pb-4 p-4'>
          <ChatBox />
        </Tab.Panel>
        <Tab.Panel className='pb-0 xl:pb-4 p-4'>
          <Notes/>
        </Tab.Panel>
      </Tab.Group>
  )
}

export default EditChatBox