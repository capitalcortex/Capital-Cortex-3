import React from 'react'

const data=[
    {
        date:"March 1, 2022",
        speechTitle:"Sponsor’s speech",
        speech:"(Sitting 22)",
        senatorTitle:"Pierre Dalphond",
        senator:"(Progressive Senate Group)"
    },
    {
        date:"March 1, 2022",
        speechTitle:"Sponsor’s speech",
        speech:"(Sitting 22)",
        senatorTitle:"Pierre Dalphond",
        senator:"(Progressive Senate Group)"
    },
    {
        date:"March 1, 2022",
        speechTitle:"Sponsor’s speech",
        speech:"(Sitting 22)",
        senatorTitle:"Pierre Dalphond",
        senator:"(Progressive Senate Group)"
    },
    {
        date:"March 1, 2022",
        speechTitle:"Sponsor’s speech",
        speech:"(Sitting 22)",
        senatorTitle:"Pierre Dalphond",
        senator:"(Progressive Senate Group)"
    }
]

const DetailsTable = () => {
  return (
    <div className="overflow-x-auto">
    <div className="inline-block min-w-full align-middle rounded-2xl overflow-hidden border">
        <table className="min-w-full">
            <thead>
                <tr className=''>
                    <th scope='col' className="px-3 md:px-4 py-3 bg-theme-gray-100 text-left text-xs text-black font-bold">
                    Speech date
                    </th>
                    <th scope='col' className="px-3 md:px-4 py-3 bg-theme-gray-100 text-center text-xs text-black font-bold">
                    Speech
                    </th>
                    <th scope='col' className="px-3 md:px-4 py-3 bg-theme-gray-100 text-center text-xs text-black font-bold">
                    Senator
                    </th>
                </tr>
            </thead>
            <tbody className="space-y-2">
                {data.map((item: any,i:any) => {
                    return <>
                        <tr className=''>
                            <td data-label="Speech date" className="whitespace-nowrap px-3 md:px-6 py-4 md:py-6 text-xs md:text-left text-center text-theme-gray-575 border-b border-theme-gray-100">
                                {item.date} 
                            </td>
                            <td data-label="Speech" className="whitespace-nowrap px-3 md:px-6 py-4 md:py-6 text-xs text-center text-theme-gray-575 border-b border-theme-gray-100">
                            <p className='text-black font-bold'>{item.speechTitle}</p>
                               <span className='block'>{item.speech}</span>  
                            </td>
                            <td data-label=" Senator" className="whitespace-nowrap px-3 md:px-6 py-4 md:py-6 text-xs text-center text-theme-gray-575 border-b border-theme-gray-100">
                               <p className='text-black font-bold'>{item.senatorTitle}</p>
                               <span className='block'>{item.senator}</span>
                            </td>                           
                        </tr>
                    </>
                })}
            </tbody>
        </table>
    </div>
</div>
  )
}

export default DetailsTable