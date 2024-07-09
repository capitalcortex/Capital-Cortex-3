import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react';
import Button from '@/components/Buttons/Button';

interface Iprops {
    index?: number;
    article?:any
    
}
const ArticlesCard = ({ index, article  }: Iprops) => {
    const filters = ["Finance", "Education", "Education", "Education", "Education"]
    return (
        <article key={index} className='alert'>
            <>
                <div className="flex items-center justify-between">
                    <ul className={`alert__head`}>
                        {filters.map((filter, i) => (
                            <li key={i} className='alert__head__label'>{filter}</li>
                        ))}
                    </ul>
                </div>
                <Link href={`/announcement-details/${article}`}><h2>House of Representatives approved Federal Funding Update</h2></Link>
            </>
            <div className="alert__footer">
                <div>
                    <address>{"United States"}</address>
                    <time dateTime='2023-11-10'>{"Nov 10, 2023"}</time>
                </div>
                {/* <Link href={`/announcement-details/${article}`}><Button size='small' variant='gray' as="link" url="#" className='!min-w-max mt-3'>READ MORE</Button></Link> */}
                <Link className='btn btn-gray btn-sm !min-w-max mt-3' href={`/announcement-details/${article}`}>READ MORE</Link>
            </div>
        </article>
    )
}

export default ArticlesCard