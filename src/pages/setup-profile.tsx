import SetupProfileModule from '@/modules/SetupProfileModule'
import Head from 'next/head'
import React from 'react'
const SetupProfile = () => {
    return (
        <>
            <Head>
                <title>Capital Cortex | Set Profile</title>
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
            <SetupProfileModule />
        </>
    )
}
export default SetupProfile