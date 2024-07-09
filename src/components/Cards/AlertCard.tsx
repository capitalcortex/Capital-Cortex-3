import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'
import Button from '../Buttons/Button';
import { Menu, Transition } from '@headlessui/react';
import { ArrowUpIcon, DownArrowIcon } from '../Icons';
interface Iprops {
    index?: number;
    report?: any;
}
const AlertCard = ({ index, report }: Iprops) => {
    // const filters = ["Finance", "Education", "Education", "Education", "Education"]

    return (
        <article key={index} className='alert'>
            <>
                <div className="flex items-center justify-between">
                    <ul className={`alert__head`}>
                        <li className='alert__head__label'>{report?.jurisdiction}</li>
                    </ul>
                </div>
                {/* <h2 className='font-semibold line-clamp-2'>{report?.title}</h2> */}
                <Link href={`report-details/${report?._id}`}><h2 className='font-semibold line-clamp-2'>{report?.title}</h2></Link>
                <p className='text-sm line-clamp-4'>{report?.discription}</p>
                <ul className='alert__categories'>
                    {report?.formats.map((format:any, i: number) => (
                        <li key={i} className='alert__categories__label'>{format}</li>
                    ))}
                </ul>
            </>
            <div className="alert__footer">
                <div className='alert__footer__date'>
                    <div className='flex flex-col'>
                        <address>{"Last Updated"}</address>
                        <time dateTime='2023-11-10'>{report?.last_updated}</time>
                    </div>

                    <div className='flex flex-col'>
                        <address>{"Date Published"}</address>
                        <time dateTime='2023-11-10'>{report?.date_published}</time>
                    </div>
                </div>
                <div className='alert__footer__publisher flex flex-col mb-3'>
                    <p className='text-xs'>Publisher</p>
                    <h2 className='font-bold text-sm text-black'>{report?.publisher}</h2>
                </div>

                <div className='alert__footer__publisher flex flex-col'>
                    <p className='text-xs'>Keywords</p>
                    <h2 className=' text-sm text-black'>
                        {report?.keywords.map((keyword: any, i: number) => (
                            `${keyword}${report?.keywords.length - 1 == i ? '' : ', '}`
                        ))}
                    </h2>
                </div>
            </div>
            {/* <Button size='small' variant='gray' as="link" url="#" className='!min-w-max'>
                    READ MORE
                </Button> */}
        </article>
    )
}

export default AlertCard