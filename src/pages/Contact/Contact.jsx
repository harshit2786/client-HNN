import { Image } from '@nextui-org/react'
import React from 'react'
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

function Contact() {
  const handleCopy =(id)=> {
    navigator.clipboard.writeText(id);
    Toastify({
      text: "UserId copied to clipboard",
      gravity: "bottom", // `top` or `bottom`
      position: "right",
      style: {
        background: "#FAE9DD",
        color: "#BF7B67" ,
        boxShadow: "none",
        fontSize: "12px"
      }
    }).showToast();
  }
  return (
    <div className='h-screen gap-8 flex flex-col items-center justify-center'>
      <div className='flex flex-col items-center justify-center gap-4'>
         <p className=' align-middle justify-center items-center text-sm'>Adarshi Onee San :</p>
         <div className=' flex gap-8 items-center justify-center'>
         
         <a href='mailto:adarshidy@gmail.com'><Image src='/email.png' alt='Email'/></a>
          <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/heartsandnotes_/'><Image src='/instagram.png' alt='Insta'/></a>
          <Image className=' cursor-pointer' onClick={()=> handleCopy('1149756581609750560')} src='/discord.png' alt='Insta'/>
         </div>
      </div>
      <div className='flex flex-col items-center justify-center gap-4'>
      <p className=' align-middle justify-center items-center text-sm'>Harshit Onii San :</p>
         <div className=' flex gap-4 items-center justify-center'>
         <a href='mailto:harshit.2002.singh@gmail.com'><Image src='/email.png' alt='Email'/></a>
          <a target="_blank" rel="noopener noreferrer" href='https://www.instagram.com/__.harshit.singh_03/'><Image src='/instagram.png' alt='Insta'/></a>
          <a target="_blank" rel="noopener noreferrer" href='https://www.linkedin.com/in/harshit-kumar-singh-iitk/'><Image src='/linkedin.png' alt='Linkedin'/></a>
          <a target="_blank" rel="noopener noreferrer" href='https://github.com/harshit2786'><Image src='/github.png' alt='Github'/></a>
          <Image className=' cursor-pointer' onClick={() => handleCopy("781771271629176852")} src='/discord.png' alt='Insta'/>
         </div>
      </div>
    </div>
  )
}

export default Contact
