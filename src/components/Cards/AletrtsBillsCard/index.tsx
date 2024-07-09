import Link from 'next/link'
import React, { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import AlertsBlueSelect from './AlertsBlueSelect';
import AlertsRedSelect from './AlertsRedSelect';
import AlertsGreenSelect from './AlertsGreenSelect';
import Button from '@/components/Buttons/Button';

interface Iprops {
    index?: number;
    bill?: object;
}
const AlertBillsCard = ({ index, bill }: Iprops) => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    return (
        <article key={index} className='alert alert__bills'>
            <>
            <div className='flex gap-2.5'>
                {/* @ts-ignore */}
                <div className='w-[71px] h-14 rounded-md bg-theme flex justify-center items-center font-bold text-lg'>{bill?.bill}</div>
                <div>
                    {/* @ts-ignore */}
                    <p className='text-sm font-bold line-clamp-1'>{`${bill?.session.split('-')[0]} ${bill?.bill.includes('S') ? 'Senate' : 'Parliament'}, ${bill?.session.split('-')[1]} session`}</p>
                    {/* @ts-ignore */}
                    <span className='text-sm text-theme-gray-375'>{`${months[bill?.completed_month - 1]} ${bill?.completed_day}, ${bill?.completed_year}`}</span>
                </div>
            </div>
                {/* @ts-ignore */}
                <Link href={`legislation-details/${bill?._id}`}>
                {/* @ts-ignore */}
                <h2 className='font-semibold line-clamp-4'>{bill?.title}</h2>
                </Link>
                <ul className='alert__categories'>
                    {/* @ts-ignore */}
                    <li className='alert__categories__label'>{bill?.status}</li>
                    {/* @ts-ignore */}
                    <li className='alert__categories__label'>{bill?.latest_stage_completed}</li>
                </ul>
            </>
            <div className="flex gap-2">
                {/* @ts-ignore */}
                {bill?.bill.includes('S') ? <AlertsRedSelect bill={bill}/> : <AlertsGreenSelect bill={bill}/>}
                {/* @ts-ignore */}
                {bill?.bill.includes('S') ? <AlertsGreenSelect bill={bill}/> : <AlertsRedSelect bill={bill}/>}
                <AlertsBlueSelect bill={bill}/>
            </div>
        </article>
    )
}

export default AlertBillsCard