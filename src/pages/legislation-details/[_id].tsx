
import Breadcrumb from '@/components/BreadcrumbNav/Breadcrumb'
import { UserIcon } from '@/components/Icons'
import LayoutUser from '@/components/Layout/LayoutUser'
import LegislationDetailTabs from '@/components/LegislationDetailTabs'
import { DocIcon1, DocsIcon } from '@/components/svgs'
import Head from 'next/head'
import React from 'react'

function LegislationCardDetail() {
  return (
    <>
      <Head>
        <title>Capital Cortex | Legislation Details</title>
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
            <article className='legislation_detail flex flex-col gap-y-6'>
              <div className='legislation_detail__head'>
                <p>Statutes of Canada 2022, c. 17</p>
                <h4 className='font-semibold'>This bill received royal assent on December 15, 2022</h4>
              </div>
              <div className='legislation_detail__alert'>
                <div>
                  <div className='flex gap-2.5 mb-6'>
                    <div className='legislation_detail__box'>S-2</div>
                    <div>
                      <p className='text-sm font-bold line-clamp-1'>{`44th Parliament, 1st session`}</p>
                      <span className='text-sm text-theme-gray-375'>{`Nov 22, 2021, to present`}</span>
                    </div>
                  </div>
                  <h2 className='font-semibold line-clamp-4 h2'>{"An Act to amend the Criminal Code and the Identification of Criminals Act and to make related amendments to other Acts (COVID-19 response and other measures)"}</h2>
                </div>
                <div className='flex flex-col gap-2 w-full md:max-w-[432px] sm:max-w-[350px]'>
                  <div className='legislation_detail__inner'>
                    <span className='shrink-0'><DocsIcon /></span>
                    <div>
                      <p className='text-sm font-bold'>Bill Type</p>
                      <span className='text-theme-gray-325'>Senate Government Bill</span>
                    </div>
                  </div>
                  <div className='legislation_detail__inner'>
                    <span className='shrink-0'><UserIcon /></span>
                    <div>
                      <p className='text-sm font-bold'>Sponsor</p>
                      <span className='text-theme-gray-325'>Sen. Marc Gold</span>
                    </div>
                  </div>
                </div>
              </div>
              <LegislationDetailTabs/>

            </article>
          </div>
        </section>
      </LayoutUser>
    </>
  )
}

export default LegislationCardDetail