import { stakeholderGlobalHeadingDescription, stakeholderGlobalHeadingTitle } from '@/components/Content'
import GlobalHeadingSection from '@/components/GlobalHeadingSection/GlobalHeadingSection'
import LayoutUser from '@/components/Layout/LayoutUser'
import DynamicCard from '@/components/Stakeholders/DynamicCard'
import StakeholderDetails from '@/components/Stakeholders/StakeholderDetails'
import StakeholderDrawer from '@/components/Stakeholders/StakeholderDrawer'
import StakeholdersModule from '@/modules/StakeholdersModule'
import { Transition } from '@headlessui/react'
import Head from 'next/head'
import React, { useState } from 'react'
const Stakeholders = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [isDetailOpen, setIsDetailOpen] = useState(false)
    const [type, setType] = useState('Add')

    return (
        <>
            <Head>
                <title>Capital Cortex | Stakeholders</title>
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
                <section className='py-4 sm:py-12'>
                    <div className="theme-container">
                        <GlobalHeadingSection title={stakeholderGlobalHeadingTitle} description={stakeholderGlobalHeadingDescription}>
                            <StakeholderDrawer setType={setType} isOpen={isOpen} setIsOpen={setIsOpen} />
                        </GlobalHeadingSection>
                        <StakeholdersModule setType={setType} isOpen={isOpen} setIsOpen={setIsOpen} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} />
                        <>
                            {isOpen ? (
                                <div
                                    onClick={() => {
                                        setIsOpen(!isOpen)
                                    }}
                                    className="bg-black opacity-30 left-0 fixed inset-0 z-10 w-full h-screen transition-all"
                                ></div>
                            ) : (
                                ""
                            )}
                            <Transition
                                show={isOpen}
                                enter="transform transition-transform duration-500 ease-in-out"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition-transform duration-500 ease-in-out"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                                className={"absolute top-0 w-3/4 lg:w-[58.5rem] right-0 z-10 h-full"}
                            >
                                <DynamicCard type={type} isOpen={isOpen} setIsOpen={setIsOpen} />
                            </Transition>
                        </>
                        <StakeholderDetails isOpen={isDetailOpen} setIsOpen={setIsDetailOpen} />
                    </div>
                </section>
            </LayoutUser>
        </>
    )
}
export default Stakeholders