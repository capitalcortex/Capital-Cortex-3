import React from 'react'
import { FaceBookIcon, LinkdInIcon, TwitterIcon, YouTubeIcon } from '@/components/Icons'
import Link from 'next/link'
import Image from 'next/legacy/image'
import { useRouter } from 'next/router'
import ls from "localstorage-slim"; 
function Footer() {
    const router = useRouter()
    const token = !(ls.get("access_token", { decrypt: true }))
    const smallFooter = router.asPath.includes('/ai-assistant') || (router.pathname.includes('documents') && router.pathname.split('/').length >= 3)
    return (
        <footer className={`bg-theme-gray-575 ${smallFooter && "hidden md:block"}`}>
            <div className='main-container'>
                {token ?
                    <div className='footer__container'>
                        <Link href="/" className="footer__logo">
                            <Image blurDataURL='https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-white.svg' placeholder='blur' height={56} width={150} src="https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-white.svg" alt="capital cortex logo" aria-label='capital cortex company logo' className='block' />
                        </Link>
                        <ul>
                            <li><Link href="/#about" className={`${router.asPath === "/#about" ? "text-white" : "text-white/40"}`}>About Us</Link></li>
                            <li><Link href="/#vision" className={`${router.asPath === "/#vision" ? "text-white" : "text-white/40"}`}>Vision</Link></li>
                            <li><Link href="/#features" className={`${router.asPath === "/#features" ? "text-white" : "text-white/40"}`}>Features</Link></li>
                            <li><Link href="/#advisory" className={`${router.asPath === "/#advisory" ? "text-white" : "text-white/40"}`}>Advisory Board</Link></li>
                        </ul>
                        <ul className='block md:!hidden'>
                            <li><Link className='text-white/40' href="/terms-of-service">Terms of Service</Link></li>
                            <li><Link className='text-white/40' href="/privacy-policy">Privacy Policy</Link></li>
                        </ul>
                        <div>
                            <Link href="https://www.facebook.com/" target='_blank'><FaceBookIcon /></Link>
                            <Link href="https://twitter.com/" target='_blank'><TwitterIcon /></Link>
                            <Link href="https://www.linkedin.com/" target='_blank'><LinkdInIcon /></Link>
                            <Link href="https://www.youtube.com/" target='_blank'><YouTubeIcon /></Link>
                        </div>
                    </div> :
                    <Link href="/" className="footer__logo pt-10">
                        <Image blurDataURL='https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-white.svg' placeholder='blur' height={56} width={150} src="https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-white.svg" alt="capital cortex logo" aria-label='capital cortex company logo' className='block' />
                    </Link>
                }
                <div className={`post__footer ${smallFooter && "py-4"}`}>
                    <ul>
                        <li><Link href="/terms-of-service">Terms of Service</Link></li>
                        <li><Link href="/privacy-policy">Privacy Policy</Link></li>
                    </ul>
                    {
                        smallFooter ? null : <Link href="/">
                            <Image blurDataURL='https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-white.svg' placeholder='blur' height={56} width={150} src="https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-white.svg" alt="capital cortex logo" aria-label='capital cortex company logo' className='block' />
                        </Link>
                    }
                    <p>{`Copyright © ${new Date().getFullYear()} Capital Cortex. All rights reserved.`}</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer