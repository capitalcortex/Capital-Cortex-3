import Breadcrumb from '@/components/BreadcrumbNav/Breadcrumb'
import LayoutUser from '@/components/Layout/LayoutUser'
import ReportDetailCard from '@/components/ReportDetailCard/ReportDetailCard'
import Head from 'next/head'
import React from 'react'

function ReportCardDetail () {
  return (
    <>
      <Head>
        <title>Capital Cortex | Report Details</title>
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
            <article className='grid sm:grid-cols-12 grid-cols-1 gap-6 items-start'>
             <div className='xl:col-span-9 lg:col-span-8 sm:col-span-7'>
                <h3 className='h2 text-black font-semibold mb-2'>Proactive Disclosure - Travel Expenses</h3>
                <p className='mb-8'>Travel Expenses: The rules and principles governing travel are outlined in the Policies for Ministers&apos; Offices, the National Joint Council&apos;s Travel Directive, the Treasury Board&apos;s <u className='font-semibold'> Directive on Travel, Hospitality, Conference and Event Expenditures</u>  and Special Travel Authorities. This dataset consolidates all the Travel Expense reports submitted by federal institutions.</p>
                <h4 className='h2 text-black font-semibold mb-2'>Data and Resources</h4>
                <ReportDetailCard/>
                <div className='mt-6'>
                       <div className="px-6 py-4 bg-black rounded-t-xl flex items-center justify-between">
                           <p className="text-white sm:text-lg text-sms font-bold">Similar Records</p>
                       </div>
                       <div className="px-6 py-3 border-theme-gray-100 border rounded-b-xl">
                           <ul className="pl-3 flex flex-col gap-1 mb-4">
                               <li className="list-disc text-theme-gray-325 font-normal">
                                   <u>Proactive Disclosure - Travel Expenses</u>
                               </li>
                               <li className="list-disc text-theme-gray-325 font-normal">
                                   <u>Proactive Disclosure - Annual Expenditures on Travel, Hospitality and Conferences</u>
                               </li>
                               <li className="list-disc text-theme-gray-325 font-normal">
                                   <u>Audit of Travel, Hospitality, Conference and Event Expenditures</u>
                               </li>
                               <li className="list-disc text-theme-gray-325 font-normal">
                                   <u>Public disclosure of travel and expenses</u>
                               </li>
                               <li className="list-disc text-theme-gray-325 font-normal">
                                   <u>Report on Annual Expenditures for Travel, Hospitality and Conferences</u>
                               </li>
                           </ul>
                       </div>
                   </div>
             </div>
             
             <div className='xl:col-span-3 lg:col-span-4 sm:col-span-5'>
               <div className='border border-theme-gray-100 rounded-md p-4 mb-2'>
                  <h5 className='text-black font-bold leading-tight'>Publisher</h5>
                  <p className='text-theme-gray-325'>Treasury Board of Canada Secretariat</p>
               </div>
               <div className='border border-theme-gray-100 rounded-md p-4 mb-6'>
                  <h5 className='text-black font-bold leading-tight'>Licence</h5>
                  <p className='text-theme-gray-325'>Open Government Licence - Canada</p>
               </div>
                <div className=''>
                        <div className="px-6 py-4 bg-black rounded-t-xl flex items-center justify-between">
                            <p className="text-white sm:text-lg text-sms font-bold">Additional Information</p>
                        </div>
                        <div className="px-6 py-3 border-theme-gray-100 border rounded-b-xl">
                          <div className='mb-6'>
                             <h6 className='text-sm font-bold'>Date Published</h6>
                             <p className='text-theme-gray-325'>2016-01-29</p>
                          </div>
                          <div className='mb-6'>
                             <h6 className='text-sm font-bold'>Date Modified</h6>
                             <p className='text-theme-gray-325'>2016-01-29</p>
                          </div>
                          <div className=''>
                             <h6 className='text-sm font-bold'>Keywords</h6>
                             <p className='text-theme-gray-325'>Proactive Disclosure, PD, ATI, Transparency</p>
                          </div>
                            
                        </div>
                  </div>
             </div>
            </article>
          </div>
        </section>
      </LayoutUser>
    </>
  )
}

export default ReportCardDetail