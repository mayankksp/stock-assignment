import React from 'react'

const Message = () => {
  return (
    <div className='flex gap-4 mt-10 '>
        <button className='border px-10 py-4 text-lg font-bold bg-red-600 rounded-full hover:scale-105 transition duration-200'>Send Email</button>
        <button className='border px-10 py-4 text-lg font-bold bg-red-600 rounded-full hover:scale-105 transition duration-200'>Send Whatsapp</button>
    </div>

  )
}

export default Message
