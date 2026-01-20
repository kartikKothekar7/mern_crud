import React from 'react'

const Navbar = () => {
  return (
    <div>
        <div className='w-screen bg-gray-500 flex flex-row h-2rem item-center'>
            <a href="http://localhost:5173/login">login</a>
            <a href="http://localhost:5173/signup">signup</a>
        </div>
    </div>
  )
}

export default Navbar