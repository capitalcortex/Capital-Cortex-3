import React from 'react'
import Footer from '@/components/Footer/Footer'
import LandingHeader from '@/components/Landing/LandingHeader'
import Button from '@/components/Buttons/Button'
import { useRouter } from 'next/router'
import { ChatIcon } from '@/components/Icons'
const LayoutUser = ({ children }: any) => {
  const router = useRouter()
  return (
    <>
      <LandingHeader />
      <main className="flex flex-col flex-grow">
        {children}
      </main>
      {router.pathname !== "/ai-assistant" ? <Button onClick={() => { router.push("/ai-assistant") }} variant="fixed">
        <ChatIcon height={32} width={32} color="black" />
      </Button> : ""}
      <Footer />
    </>
  )
}

export default LayoutUser