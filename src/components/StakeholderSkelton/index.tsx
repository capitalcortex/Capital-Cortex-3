import React from 'react'

const StakeholderSkelton = () => {
  return (
    <div className="animate-pulse">
    <div className="flex gap-2 justify-between items-center">
      <div className="AtTrendingNewsSkeltonText h-[155px] bg-[#f2f3f5] py-4 w-full rounded-md">
        <div className='flex gap-4 justify-between items-center px-4 border-b border-[#e5e6e7] pb-4'>
            <div className='w-14 h-14 rounded-full bg-[#e5e6e7] shrink-0'></div>
            <div className='w-full shrink-0 flex flex-col gap-3'>
                <div className='w-1/2 h-1 bg-[#e5e6e7]'></div>
                <div className='w-3/4 h-1 bg-[#e5e6e7]'></div>
            </div>
        </div>
        <div className='p-4 pb-0 w-full'>
              <div className='w-1/3 h-10 bg-[#e5e6e7] rounded-xl'></div>
            </div>
      </div>
    </div>
  </div>
  )
}

export default StakeholderSkelton