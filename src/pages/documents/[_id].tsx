import LayoutUser from '@/components/Layout/LayoutUser'
import EditChatBox from '@/components/Projects/EditChatBox'
import EditProjectBox from '@/components/Projects/EditProjectBox'
import { Tab } from '@headlessui/react'
import Head from 'next/head'
import React from 'react'

const EditProject = () => {
    
    return (
        <>
            <Head>
                <title>Capital Cortex | Edit Document</title>
                <meta name="theme-color" content="#eeb127" />
                <meta name="description" content="AI Enhanced Public Policy and Government Affairs" />
                {/* <link rel="apple-touch-icon" sizes="76x76" href="https://capitalcortstorage.blob.core.windows.net/app-assets/capital-cortex/public/apple-touch-icon.png" /> */}
                <link rel="icon" type="image/png" sizes="32x32" href="https://capitalcortstorage.blob.core.windows.net/app-assets/public_icons/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="https://capitalcortstorage.blob.core.windows.net/app-assets/public_icons/favicon-16x16.png" />
                <link rel="manifest" href="https://capitalcortstorage.blob.core.windows.net/app-assets/public_icons/site.webmanifest" />
                <meta name="msapplication-TileColor" content="#da532c" />
                <meta name="theme-color" content="#ffffff" />
                <meta property="og:title" content="Capital Cortex" />
                <meta property="og:image" content="https://capitalcortstorage.blob.core.windows.net/app-assets/public_icons/android-chrome-512x512.png" />
                <meta property="og:image:type" content="image/png" />
                <meta property="og:image:width" content="512" />
                <meta property="og:image:height" content="512" />
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:url" content="https://dev.capitalcortex.ai" />
                <meta name="twitter:title" content="AI Enhanced Public Policy and Government Affairs" />
                <meta name="twitter:description" content="AI Enhanced Public Policy and Government Affairs" />
                <meta name="twitter:image" content="https://capitalcortstorage.blob.core.windows.net/app-assets/public_icons/android-chrome-512x512.png" />
            </Head>
            <LayoutUser>
                <section className='chat__module'>
                    <div className="theme-container flex flex-col grow relative">
                        <div className={`hidden xl:flex grow items-start h-[calc(100dvh_-_440px)]`}>
                            <div className={`chat__content h-full`}>
                                <EditProjectBox />
                            </div>
                            <aside className={`chat__history`}>
                                <EditChatBox /> 
                            </aside>
                        </div>
                        <div className={`xl:hidden grow h-[calc(100dvh_-_440px)] overflow-scroll scrollbar-hidden`}>
                            <Tab.Group as="div">
                                <Tab.List as='ul' className={`chat__history__tab__nav max-575:px-0`}>
                                    <Tab as={'li'} className={"focus-visible:outline-none"}>
                                        {({ selected }) => (
                                            <button className={`!text-lg ${selected ? 'text-gray-575 border-b-4 border-[#eeb127]' : 'text-gray-425'} leading-1`}>Edit Document</button>
                                        )}
                                    </Tab>
                                    <Tab as={'li'} className={"focus-visible:outline-none"}>
                                        {({ selected }) => (
                                            <button className={`!text-lg ${selected ? 'text-gray-575 border-b-4 border-[#eeb127]' : 'text-gray-425'} leading-1`}>Chat</button>
                                        )}
                                    </Tab>
                                </Tab.List>
                                <Tab.Panels>
                                    <Tab.Panel className="focus:outline-none xl:p-5">
                                        <EditProjectBox />
                                    </Tab.Panel>
                                    <Tab.Panel className="focus:outline-none xl:p-5">
                                        <EditChatBox />
                                    </Tab.Panel>
                                </Tab.Panels>
                            </Tab.Group>
                        </div>
                    </div>
                </section>
            </LayoutUser>
        </>
    )
}
export default EditProject