import Link from 'next/link'
import { useRouter } from 'next/router';
import React from 'react'

const Breadcrumb = () => {
    const router =useRouter()

    return (
        <nav className="breadcrumb">
            <ul>
                <li><span><Link href="/home" className={`${router.pathname === "/home" ? "active" : ""}`}>Home</Link></span></li>
                <li><Link href="/alerts" className={`${router.pathname=== "/alerts" ? "active" : ""}`}>Alert</Link></li>
            </ul>
        </nav>
    )
}

export default Breadcrumb