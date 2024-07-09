import React from 'react'
import TrendingNews from './TrendingNews'
import UpdatesSection from './UpdatesSection'
import { ChatIcon } from '@/components/Icons'
import { useRouter } from 'next/router'
import Button from '@/components/Buttons/Button'
const NewsSection = () => {
  const router = useRouter()
  return (
    <section className=' '>
      <div className='flex-col lg:flex-row flex gap-4 sm:gap-8'>
        <TrendingNews />
        <UpdatesSection />
        <Button onClick={() => { router.push("/ai-assistant") }} variant="fixed">
          <ChatIcon height={32} width={32} color="black" />
        </Button>
      </div>
      <div className="w-full lg:w-[70%]">
        <UpdatesSection />
      </div>
      <button onClick={() => { router.push("/ai-assistant") }} className="fixed bottom-10 right-10 h-16 w-16 rounded-full bg-theme flex justify-center items-center drop-shadow-2xl shrink-0">
        <ChatIcon height={32} width={32} color="black" />
      </button>
    </section>
  )
}


export default NewsSection