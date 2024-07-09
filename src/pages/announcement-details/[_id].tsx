
import Breadcrumb from '@/components/BreadcrumbNav/Breadcrumb'
import LayoutUser from '@/components/Layout/LayoutUser'
import Head from 'next/head'
import React from 'react'

function AnnouncementCardDetail () {
  return (
    <>
      <Head>
        <title>Capital Cortex | Announcement Details</title>
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
            <Breadcrumb />
            <article className='article-detail'>
              <h1>Announcement Details</h1>
              <time dateTime="Nov 10, 2023">United State Nov 10, 2023</time>
              <ul className={`alert__head mb-5`}>
                <li className='alert__head__label'>Finance</li>
                <li className='alert__head__label'>Legal Services</li>
                <li className='alert__head__label'>Education</li>
                <li className='alert__head__label'>Real Estate</li>
                <li className='alert__head__label'>Healthcare</li>
              </ul>
              <time dateTime="November 14, 2023">November 14, 2023</time>
              <p>This week, the House of Representatives approved a two-tiered short-term continuing resolution (CR) keeping the government open and avoiding a government shutdown on Nov. 17. The Senate is expected to approve it and the President is expected to sign this bill into law by the end of this week.</p>
              <p>This is a complex piece of legislation with differing end dates for many programs. The full bill text of the legislation is available for review.</p>
              <p>Here are key provisions and dates of importance to public health officials.</p>
              <h2>January 19, 2024</h2>
              <p className='!mb-0'>Funding for discretionary programs in the Agriculture Appropriation bill (WIC and FDA) is extended through Jan. 19, 2024 at current levels. Additional programs under the Jan. 19 extension include the following:</p>
              <ul className='article__listItem'>
                <li>Mandatory funding for teaching centers that operate graduate medical education programs.</li>
                <li>Mandatory funding for community health centers.</li>
                <li>Mandatory funding for the National Health Service Corps.</li>
                <li>Mandatory funding for the special diabetes program.</li>
                <li>Extension of some authorizations including the temporary reassignment of state and local personnel included in the Pandemic and All Hazards Preparedness Act (PAHPA).</li>
              </ul>
              <h2>February 2, 2024</h2>
              <p className='!mb-0'>Funding for HHS discretionary programs (NIH, CDC, HRSA, SAMHSA) and others such as EPA are extended through Feb. 2, 2024 at current levels. Additional items under the Feb. 2 extension include the following:</p>
              <ul className='article__listItem'>
                <li>Compacts of Free Association with the Federated States of Micronesia and the Republic of the Marshall Islands.</li>
              </ul>
              <h2>Other Updates</h2>
              <p>The House of Representatives is also simultaneously considering the FY24 Labor, Health and Human Services, and Education (LHHS) appropriations bill this week with over 200 amendments filed. This legislation is one step in the process to provide full year funding for NIH, CDC, SAMHSA, and other programs. It is unclear if this bill even has the votes to pass the House of Representatives. The House bill is a $60 billion, or 28%, reduction compared to the prior fiscal years.</p>
              <p>The Senate is not expected to consider the House FY24 LHHS appropriations bill at all due to the proposed deep cuts to many programs. Instead, the Senate Appropriations Committee has already marked up, with bipartisan approval, their version of the FY24 LHHS bill at essentially level funding. The Senate bill adheres to the top line appropriations framework that was agreed to as part of the Fiscal Responsibility Act (FRA) that raised the nation’s debt limit for borrowing or deficit spending, and established spending caps for appropriations bills for FY24 and FY25.</p>
            </article>
          </div>
        </section>
      </LayoutUser>
    </>
  )
}

export default AnnouncementCardDetail