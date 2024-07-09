import React from 'react'
import { PlusCircularIcon } from '../Icons'

const StakeholderDrawer = ({ isOpen, setIsOpen, setType }: any) => {
    return (
        <>
            <button
                onClick={() => { 
                    setType('Add') 
                    setIsOpen(!isOpen)
                }}
                className='flex bg-theme-gray-575 border border-theme-gray-125 rounded-lg p-3 justify-center items-center focus-visible:outline-none'>
                <PlusCircularIcon />
            </button>
        </>
    )
}

export default StakeholderDrawer