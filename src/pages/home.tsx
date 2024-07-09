import AlertsSection from '@/components/AlertsSection/AlertsSection'
import Breadcrumb from '@/components/BreadcrumbNav/Breadcrumb'
import LayoutUser from '@/components/Layout/LayoutUser'
import Head from 'next/head'
import React, { useEffect } from 'react'    
import TrendingNews from '@/components/NewsSection/TrendingNews'
import UpdatesSection from '@/components/NewsSection/UpdatesSection'
import { useDispatch, useSelector } from 'react-redux'
import { newsAlertAsync, userProfileMetaDataAsync } from '@/services/user/aysncThunk'
import TrendingNewsSkelton from '@/components/TrendingNewsSkelton'
import UpdatesSectionSkelton from '@/components/UpdatesSectionSkelton'
import { useRouter } from 'next/router'
const Home = () => {
    const { newsAlerts, metaData } = useSelector((state: any) => state.user)
    const dispatch = useDispatch()
    const router = useRouter();
    const filters = ["Education", "Finance"]

    useEffect(() => {
        //@ts-ignore
        dispatch(newsAlertAsync({}))

        if (Object.keys(metaData).length <= 0) {
            //@ts-ignore
            dispatch(userProfileMetaDataAsync({}))
        }
    }, [])

console.log(router.pathname)

    return (
        <>
            <Head>
                <title>Capital Cortex | Home</title>
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
                <section className='py-12'>
                    <div className='theme-container'>
                        <Breadcrumb  />
                        <AlertsSection />
                    </div>
                </section>
                <section className='bg-theme-gray-50 py-12'>
                    <div className="theme-container relative">
                        {Object.keys(newsAlerts).length > 0 ? <div className='flex-col lg:flex-row flex gap-4 sm:gap-8'>
                            <TrendingNews articles={newsAlerts['All News']['titles']} articlesLinks={newsAlerts['All News']['urls']} />
                            <UpdatesSection news={newsAlerts} />
                        </div> :
                            <div className='flex-col lg:flex-row flex gap-4 sm:gap-8 justify-start items-start'>
                                <div className="widgets flex flex-col h-[80vh] overflow-auto p-4 gap-2">
                                    <TrendingNewsSkelton />
                                    <TrendingNewsSkelton />
                                    <TrendingNewsSkelton />
                                    <TrendingNewsSkelton />
                                </div>
                                <div className="grid sm:grid-cols-2  gap-4 w-full items-start justify-start">
                                    <UpdatesSectionSkelton />
                                    <UpdatesSectionSkelton />
                                    <UpdatesSectionSkelton />
                                    <UpdatesSectionSkelton />
                                    <UpdatesSectionSkelton />
                                    <UpdatesSectionSkelton />
                                </div>
                            </div>
                        }
                    </div>
                </section>
            </LayoutUser >
        </>
    )
}
export default Home