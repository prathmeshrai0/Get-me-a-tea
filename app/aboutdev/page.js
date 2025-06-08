import React from 'react'

const page = () => {
  return (
    <div className=' flex flex-col gap-2 text-center ' >
        <h1 className='font-bold text-2xl underline'>About the Developer</h1>
        <div className='text-lg '>

        <p>This page provides information about the developer of the application.</p>
        <p>The developer is passionate about creating user-friendly and efficient web applications.</p>
        </div>
    </div>
  )
}

export default page


export const metadata = {
  title: 'AboutDev - Get Me A Tea',
 
}