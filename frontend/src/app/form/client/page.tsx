"use client"

import React, { useEffect, useState } from 'react'

function Client() {
  const [firstName, setFirstName] = useState(localStorage.getItem("firstName")||"")

  const nameChange = (e: { target: { value: React.SetStateAction<string> } }) =>{
    setFirstName(e.target.value)
  }

  useEffect(()=>{
    localStorage.setItem("firstName", firstName)
  }  
  ,[firstName])

  

  return (
    <form className="">
      <div className='after:content-["*"] after:text-[red] after:ml-0.5'>
        Name
      </div>
      
      <input type="text" defaultValue={firstName || ""} onChange={nameChange} name ="firstName"  placeholder='First Name' required/>
      
      <input className="mx-5" type="text" placeholder='Last Name' required/>

      <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
        Street Address
      </div>
      <input type="text" required/>

      <div className="flex">
        <div>
          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          City
          </div>
          <input type="text" required/>
        </div>

        <div className="ml-5">
          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          Zip Code
          </div>
          <input type="text" required/>
        </div>

      </div>

      <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          Phone Number
          </div>
          <input type="text" required/>

        <div className='mt-5'>
          Special Delivery Instructions
          </div>
      <textarea/>
   
    </form>
  )
}



export default Client
