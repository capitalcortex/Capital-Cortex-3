import React from 'react'
import { SearchCircularIcon } from '../Icons'

interface Iprops {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Searchbar = ({
  onChange,
}: Iprops) => {
  return (
    <form className='relative w-full sm:min-w-[17.875rem] flex gap-2 bg-theme-gray-50 border border-theme-gray-125 rounded-lg p-3'>
        <SearchCircularIcon/>
        <input onChange={onChange} className='w-full bg-theme-gray-50 focus-visible:outline-none' type="text" placeholder='Search...' />
    </form>
  )
}

export default Searchbar