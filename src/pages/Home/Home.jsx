import React from 'react'
import { useMobileLayout } from '../../hooks/mobilelayout'
import { Image } from '@nextui-org/react';

function Home() {
    const isMobile = useMobileLayout();
  return (
    <div className=' relative flex items-center justify-center bg-contain bg-no-repeat bg-bottom bg-[#FAE9DD] h-screen' style={{
        backgroundImage: `${isMobile ? `url("/homemob.png")` : `url("/home.png")`}`,
      }}>
      {!isMobile && <>
      <div className='h-60 w-60 absolute top-10 right-16 opacity-30 bg-[#BF7B67] rounded-full'>

      </div>
      <div className='h-60 w-60 absolute top-28 left-16 opacity-30 bg-[#BF7B67] rounded-full'>

      </div>
      <div className='h-60 w-60 absolute bottom-16 opacity-30 bg-[#BF7B67] rounded-full'>

      </div></>}
      {isMobile && <>
<div className='h-40 w-40 absolute top-[-2rem] right-0 opacity-30 bg-[#BF7B67] rounded-full'>

</div>
<div className='h-40 w-40 absolute top-60 left-[-6rem] opacity-30 bg-[#BF7B67] rounded-full'>

</div>
<div className='h-40 w-40 absolute bottom-32 right-5 opacity-30 bg-[#BF7B67] rounded-full'>

</div></>}
        <div className='flex flex-col pb-8 opacity-80 gap-4 items-center justify-center'>
            <div className=' text-4xl text-center'>Welcome to</div>
            <Image style={{height:"200px"}} alt="H&N" src="/logo.png" />
        </div>
    </div>
  )
}

export default Home
