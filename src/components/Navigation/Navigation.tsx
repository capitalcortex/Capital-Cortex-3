import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

const Navigation = () => {
    const router = useRouter()
    return (
        <div className='flex'>
            <Link href="/">Home</Link>/<Link href="/alerts">Alerts</Link>
        </div>
    )
}

export default Navigation