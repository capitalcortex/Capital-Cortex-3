import React from 'react'
import { FaceBookIcon, LinkdInIcon, TwitterIcon, YouTubeIcon } from '@/components/Icons'
import Link from 'next/link'
import { useRouter } from 'next/router'
function FooterUser() {
    const router = useRouter()
    return (
        <footer className='bg-theme-gray-575'>
            <div className='main-container'>
                <div className='py-10 flex flex-col md:flex-row flex-wrap gap-12 sm:gap-5 justify-between items-center border-b border-white/40'>
                    <Link href="/" className="flex md:hidden justify-center items-center md:order-2">
                        <img height={56} width={150} src="https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-white.svg" alt="capital cortex logo" aria-label='capital cortex company logo' className='block' />
                    </Link>
                    <ul className='flex gap-4 sm:gap-12 text-sm order-3 md:order-1'>
                        <li><Link href="#about" className={`${router.asPath === "/#about" ? "text-white" : "text-white/40"}  hover:text-theme transition`}>About Us</Link></li>
                        <li><Link href="#vision" className={`${router.asPath === "/#vision" ? "text-white" : "text-white/40"}  hover:text-theme transition`}>Vision</Link></li>
                        <li><Link href="#features" className={`${router.asPath === "/#features" ? "text-white" : "text-white/40"}  hover:text-theme transition`}>Features</Link></li>
                        <li><Link href="#advisory" className={`${router.asPath === "/#advisory" ? "text-white" : "text-white/40"}  hover:text-theme transition`}>Advisory Board</Link></li>
                    </ul>
                    <div className='flex gap-10 items-center order-2'>
                        <FaceBookIcon />
                        <TwitterIcon />
                        <LinkdInIcon />
                        <YouTubeIcon />
                    </div>
                </div>
                <div className='py-10 gap-3 flex flex-col md:flex-row md:justify-between items-center text-white/60 text-sm'>
                    <ul className='flex gap-10 justify-center items-center md:order-3'>
                        <li><Link href="#">Terms of Service</Link></li>
                        <li><Link href="#">Privacy Policy</Link></li>
                    </ul>
                    <Link href="/" className="hidden md:flex justify-center items-center md:order-2">
                        <img height={56} width={150} src="https://capitalcortstorage.blob.core.windows.net/app-assets/logos/capital-cortex-logo-white.svg" alt="capital cortex logo" aria-label='capital cortex company logo' className='block' />
                    </Link>
                    <p className='md:order-1 text-center sm:text-left'>{`Copyright © ${new Date().getFullYear()} Capital Cortex. All rights reserved.`}</p>
                </div>
            </div>
        </footer>
    )
}

export default FooterUser