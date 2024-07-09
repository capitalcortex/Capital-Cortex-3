import React, { useEffect } from 'react'
import Tabs from '../Tabs'
import ChatList from './Chatlist';
import Notes from './Notes';
import Image from 'next/image';

const ChatHistory = ({ chatHistoryToggler }: any) => {
  const NoChatHistory = () => {
    return (
      <div className='no__chat__history'>
        <Image width={124} height={124} src="https://capitalcortstorage.blob.core.windows.net/app-assets/cc/no_chat.svg" alt="No Chat History yet" className='mx-auto h-[124px]' />
        <h3>No chats Available!</h3>
        <p>Oops! No chat available at the moment.</p>
      </div>
    )
  }
  const tabsData = [
    {
      title: 'Chats',
      content: <ChatList />
    },
    {
      title: 'Notes',
      content: <Notes />
    },
  ];

  return (
    <Tabs categories={tabsData} />
  )
}

export default ChatHistory