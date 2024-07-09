import Layout from '@/components/Layout/Layout'
import { documentationAsync } from '@/services/documentation/asyncThunk'
import Head from 'next/head'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
const PrivacyPolicy = () => {
    const dispatch = useDispatch()
    const { documentation } = useSelector((state: any) => state?.documentation)
    useEffect(() => {
        // @ts-ignore
        dispatch(documentationAsync({ doc_type: "privacy" }))
    }, []);
    return (
        <>
            <Head>
                <title>Capital Cortex | Privacy Policy</title>
                <meta name="theme-color" content="#eeb127" />
                <meta name="description" content="AI Enhanced Public Policy and Government Affairs" />
                {/* <link rel="apple-touch-icon" sizes="76x76" href="https://capitalcortstorage.blob.core.windows.net/app-assets/capital-cortex/public/apple-touch-icon.png" /> */}
                <link rel="icon" type="image/png" sizes="32x32" href="https://capitalcortstorage.blob.core.windows.net/app-assets/logos/profille.png" />
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
            <Layout>
                <section className='py-10 sm:py-20 privacy-policy'>
                    <div className="main-container">
                        <div className="grid grid-cols-12">
                            <div dangerouslySetInnerHTML={{
                                __html: documentation?.content,
                            }}
                                className="col-span-12 lg:col-span-9">
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        </>
    )
}

export default PrivacyPolicy