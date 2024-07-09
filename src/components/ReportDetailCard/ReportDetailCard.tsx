import Image from 'next/image'
import React from 'react'
import Button from '../Buttons/Button'


const Data = [
    {
        img: "/images/csv.png",
        title: "Proactive Disclosure - Travel Expenses",
    },
    {
        img: "/images/csv.png",
        title: "Proactive Disclosure - Travel Expenses",
    },
    {
        img: "/images/html.png",
        title: "Proactive Disclosure - Travel Expenses",
    },
    {
        img: "/images/doc.png",
        title: "Proactive Disclosure - Travel Expenses",
    },
    {
        img: "/images/doc.png",
        title: "Proactive Disclosure - Travel Expenses",
    },
    {
        img: "/images/pdf.png",
        title: "Proactive Disclosure - Travel Expenses",
    },
]

const ReportDetailCard = () => {
    return (
        <div className='flex flex-col gap-1'>
            {
                Data.map((item, i) => (

                    <div key={i} className='border border-theme-gray-100 rounded-lg p-4 flex gap-5 lg:flex-row flex-col  lg:items-center lg:justify-between'>
                        <div className='flex items-center gap-6'>
                            <Image src={item.img} alt='docs-img' height={40} width={33} className='shrink-0'/>
                            <div>
                                <h4 className='text-black font-bold mb-2'>{item.title}</h4>
                                <div className='flex gap-1'>
                                    <span className='py-1 px-2 text-[10px] bg-theme rounded-md'>English</span>
                                    <span className='py-1 px-2 text-[10px] bg-theme rounded-md'>French</span>
                                    <span className='py-1 px-2 text-[10px] bg-theme-gray-125 rounded-md'>French</span>
                                    <span className='py-1 px-2 text-[10px] bg-theme-gray-125 rounded-md'>CSV</span>
                                </div>
                            </div>
                        </div>
                        {
                            (i == 0 || i == 1) ?
                                <Button className='lg:!min-w-[9.938rem] bg-black text-white lg:!py-2.5 !py-2'>Download File</Button> :
                                <Button className='lg:!min-w-[10.5rem] bg-black text-white lg:!py-2.5 !py-2'>Go to Resource</Button>
                        }

                    </div>
                ))
            }

        </div>

    )
}

export default ReportDetailCard