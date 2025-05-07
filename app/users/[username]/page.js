import React from 'react'

const Username = ({params}) => {
  return (
    <>
    <div className='mx-auto border w-min break-words whitespace-nowrap'>This is teh dashboard</div>
    <div>
      User is {params.username}</div>
    </>
  )
}

export default Username