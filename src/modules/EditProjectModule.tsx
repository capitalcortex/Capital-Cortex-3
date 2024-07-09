import EditChatBox from '@/components/Projects/EditChatBox'
import EditProjectBox from '@/components/Projects/EditProjectBox'
import React from 'react'

const EditProjectModule = () => {
    return (
        <div className='theme-container w-full flex flex-wrap lg:flex-nowrap justify-between sm:py-8 items-start'>
            <EditProjectBox/>
            <EditChatBox/>
        </div>
    )
}

export default EditProjectModule