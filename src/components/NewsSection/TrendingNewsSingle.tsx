import React from 'react'
import { ChatIcon, ExportLinearIcon } from '../Icons'
import Link from 'next/link'
interface Iprops{
    article?:any;
    articleLink?:any;
    index?:number;
}
const TrendingNewsSingle = ({article, articleLink, index}:Iprops) => {
    return (
        <li>
            <div key={index}  className="listItem flex flex-col">
                <div className='flex gap-2 items-center grow'>
                    <ChatIcon color="black" />
                   <div className='flex flex-col grow truncate'>
                    <Link href={articleLink} target="_blank" className='flex flex-col'>
                       <h3 className='listItem__title font-bold'>{article}</h3>
                    <div className='flex gap-2 items-center'>
                        <ExportLinearIcon className="flex-shrink-0 relative w-3 h-3" />
                        <span className="truncate !text-black !text-sm">{articleLink}</span>
                    </div>
                    
                </Link>
                   </div>
                </div>
                
            </div>
        </li>
    )
}

export default TrendingNewsSingle