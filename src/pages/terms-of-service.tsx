import Head from 'next/head'
import React, { useEffect } from 'react'
import Layout from '@/components/Layout/Layout'
import { useDispatch, useSelector } from 'react-redux'
import { documentationAsync } from '@/services/documentation/asyncThunk'
const TermsOfService = () => {
  const dispatch = useDispatch()
  const { documentation } = useSelector((state: any) => state?.documentation)
  useEffect(() => {
    // @ts-ignore
    dispatch(documentationAsync({ doc_type: "terms" }))
  }, []);
  return (
    <>
      <Head>
        <title>Capital Cortex | Terms Of Service</title>
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
      <Layout>
        <section className='py-10 sm:py-20 terms-of-service'>
          <div className="main-container">
            <div className="grid grid-cols-12">
              <div dangerouslySetInnerHTML={{
                __html: documentation?.content,
              }}
                className="col-span-12 lg:col-span-9">
              </div>
              {/* <div className="col-span-12 lg:col-span-9">
                <h1>{"Terms of service"}</h1>
                <p>Please carefully review the following terms and conditions before using the Capital Cortex Product Website <span>(&quot;<Link className='text-theme font-bold' href="capitalcortex.ai">capitalcortex.ai</Link>&quot;)</span>. Your access to or use of this site, or any service on this site, indicates your acceptance of these Terms of Service.</p>
                <p>{"Capitalcortex.ai is provided by Capital Cortex. By continuing to access or use this site, you agree to the following terms:"}</p>
                <h2>{"A. General Terms"}</h2>
                <div className="px-2">
                  <h3>1. License</h3>
                  <ul>
                    <li>
                      <p>{`Capital Cortex provides Customer with a restricted, non-exclusive right to access and utilize designated Capital Cortex products ("Products") outlined in the relevant Order Form(s).`}</p>
                    </li>
                    <li>
                      <p>{`Customer and Users agree to comply with the terms outlined in this Agreement and any other terms governing website access provided by Capital Cortex.`}</p>
                    </li>
                  </ul>
                  <h3>{"2. Authorized Users:"}</h3>
                  <ul>
                    <li>
                      <p>{`Products may only be accessed and used by authorized individuals designated by Capital Cortex. ("Users").`}</p>
                    </li>
                    <li>
                      <p>{`Users must be Customer's employees or temporary staff under Customer’s direct control.`}</p>
                    </li>
                    <li>
                      <p>{`Access by any other third party is prohibited.`}</p>
                    </li>
                  </ul> 
                  <h3>{"3. Copyright:"}</h3>
                  <ul>
                    <li>
                      <p>{"The content and software within the Products are protected by copyright laws."}</p>
                    </li>
                    <li>
                      <p>{"Capital Cortex and its licensors retain all rights to the Products."}</p>
                    </li>
                  </ul>
                  <h3>{"4. Permitted Uses:"}</h3>
                  <ul>
                    <li>
                      <p>{"Users may access and use the Products for internal business purposes only."}</p>
                    </li>
                    <li>
                      <p>{"Sharing of User names and passwords is prohibited."}</p>
                    </li>
                    <li>
                      <p>{"Prompt notification of any unauthorized use is required."}</p>
                    </li>
                  </ul>
                  <h3>{"5. Restrictions"}</h3>
                  <ul>
                    <li>
                      <p>{"Reproduction, distribution, or modification of the Products is prohibited without prior consent."}</p>
                    </li>
                    <li>
                      <p>{"Users may not use the Products in any manner that could compete with Capital Cortex business interests."}</p>
                    </li>
                  </ul>
                  <h3>{"6. Disclaimer of Professional Advice:"}</h3>
                  <ul>
                    <li>
                      <p>{"Information provided by the Products does not constitute professional advice."}</p>
                    </li>
                    <li>
                      <p>{"Users should consult appropriate advisors for specific guidance."}</p>
                    </li>
                  </ul>
                  <h3>{"7. Representations; Limited Warranty:"}</h3>
                  <ul>
                    <li>
                      <p>{"Customer agrees to comply with all applicable laws."}</p>
                    </li>
                    <li>
                      <p>{`Products are provided "as is" without warranty.`}</p>
                    </li>
                  </ul>
                  <h3>{"8. Limitation of Liability:"}</h3>
                  <ul>
                    <li>
                      <p>{"Capital Cortex is not liable for any damages related to the use of the Products."}</p>
                    </li>
                  </ul>
                  <h3>{"9. Term and Termination:"}</h3>
                  <ul className='mb-8'>
                    <li>
                      <p>{"This Agreement remains in effect for the term specified in the Order Form."}</p>
                    </li>
                    <li>
                      <p>{"Termination may occur upon breach of terms or other specified conditions."}</p>
                    </li>
                  </ul>
                </div>
                <h2>{`B. Additional Terms relating to Certain Third-Party Data Sources.`}</h2>
                <div className="flex flex-col gap-4">
                  <p>{"Users’ use of content from third-party sources (e.g, Twitter, Youtube, Reddit) that appear within the Product(s), including but not limited to within the CapitalCortex News Feed is subject to the following additional terms:"}</p>
                  <div className="px-2">
                    <h3>{`1. Users shall not use, or facilitate or allow others to use, the Capitalcortex.ai News Feed:`}</h3>
                    <ul className='!list-none !px-2 !mb-0'>
                      <li><p>{`a) for any illegal or fraudulent activity;`}</p></li>
                      <li><p>{`b) to violate the rights of others, including without limitation to facilitate or promote copyright infringement or the exploitation of copyright-infringing materials;`}</p></li>
                      <li><p>{`c) to threaten, incite, promote, or actively encourage violence, terrorism, or other serious harm;`}</p></li>
                      <li><p>{`e) for any content or activity that promotes child sexual exploitation or abuse;`}</p></li>
                      <li><p>{`f) to violate the security, integrity, or availability of any user, network, computer or communications system, software application, or network or computing device; or`}</p></li>
                      <li><p>{`g) to distribute, publish, send, or facilitate the sending of unsolicited mass email or other messages, promotions, advertising, or solicitations (or “spam”).`}</p></li>
                    </ul>
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </section>
      </Layout>
    </>
  )
}

export default TermsOfService