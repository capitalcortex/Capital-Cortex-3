import StakeholderCard from '@/components/Stakeholders/StakeholderCard'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Image from 'next/image'
import { getStakeholdersAsync } from '@/services/stakeholder/asyncThunk'
import StakeholderSkelton from '@/components/StakeholderSkelton'
import { userProfileMetaDataAsync } from '@/services/user/aysncThunk'

interface Iprops{
    isOpen?:boolean,
    setIsOpen?:any,
    isDetailOpen?:boolean,
    setIsDetailOpen?:any,
    setType?:any
}
const StakeholdersModule = ({isOpen,setIsOpen,isDetailOpen, setIsDetailOpen, setType}:Iprops) => {
    const { stakeholders, isLoading } = useSelector((state: any) => state.stakeholder)
    const { metaData } = useSelector((state: any) => state.user);
    const dispatch = useDispatch()

    useEffect(() => {
        //@ts-ignore
      dispatch(getStakeholdersAsync({}))

      if(Object.keys(metaData).length <= 0){
        //@ts-ignore
        dispatch(userProfileMetaDataAsync({}))
      }

    }, [])
    
    return (
        <>
            {
                isLoading ? 
                    <ul className="stakeholders">
                        {
                            [1,2,3,4,5,6].map((item, index) => (
                                <StakeholderSkelton key={index}/> 
                            ))
                        }
                    </ul>
                :
                <>
                    {
                        stakeholders.length <= 0 ? 
                        <div className='h-[calc(100vh-386px)] w-full flex justify-center items-center'>
                            <div className='flex flex-col gap-4 items-center py-6'>
                                <figure className="sm:w-[15rem] sm:h-[15rem] relative w-36 h-32">
                                    <Image placeholder="blur" layout="fill" blurDataURL="https://capitalcortstorage.blob.core.windows.net/app-assets/cc/start_chat.svg" src="https://capitalcortstorage.blob.core.windows.net/app-assets/cc/start_chat.svg" alt="No Chat yet" quality={100} />
                                </figure>
                                <p className='font-bold text-2xl'>No data found!</p>
                            </div>
                        </div> : 
                        <ul className="stakeholders">
                            {
                                stakeholders.map((stakeholder: any, i: number) => (
                                    <StakeholderCard setType={setType} isOpen={isOpen} setIsOpen={setIsOpen} isDetailOpen={isDetailOpen} setIsDetailOpen={setIsDetailOpen} stakeholder={stakeholder} key={i} />
                                ))
                            }
                        </ul>
                    }
                </>
            }
        </>
    )
}

export default StakeholdersModule