"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Button from '../components/Button'
import TextInput from '../components/TextInput'

interface ClientProps {
  first: string
  last: string
  address: string
  city: string
  zip: string
  phone: string
  instructions: string
  setFirst: Dispatch<SetStateAction<string>>;
  setLast: Dispatch<SetStateAction<string>>;
  setAddress: Dispatch<SetStateAction<string>>;
  setCity: Dispatch<SetStateAction<string>>;
  setZip: Dispatch<SetStateAction<string>>;
  setPhone: Dispatch<SetStateAction<string>>;
  setInstructions: Dispatch<SetStateAction<string>>;
  setFormPage: Dispatch<SetStateAction<string>>;
}


function Client(props: ClientProps) {
  

  

  return (
    <form className="">
      <div className='after:content-["*"] after:text-[red] after:ml-0.5'>
        Name
      </div>

      <div className='flex flex-row'>
      <TextInput value={props.first || ''} placeholder={'First Name'} onChange={props.setFirst}/>
  
      <div className='ml-5'>
      <TextInput value={props.last || ''} placeholder={'Last Name'} onChange={props.setLast }/>
      </div>
      </div>
  
      <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
        Street Address
      </div>
      <TextInput value={props.address || ''} placeholder={''} onChange={props.setAddress }/>

      <div className="flex">
        <div>
          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          City
          </div>
          <TextInput value={props.city || ''} placeholder={''} onChange={props.setCity }/>
        </div>

        <div className="ml-5">
          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          Zip Code
          </div>
          <TextInput value={props.zip || ''} placeholder={''} onChange={props.setZip }/>
        </div>

      </div>

      <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          Phone Number
          </div>
          <TextInput value={props.phone || ''} placeholder={''} onChange={props.setPhone }/>

        <div className='mt-5'>
          Special Delivery Instructions
          </div>
          <TextInput value={props.instructions || ''} placeholder={''} onChange={props.setInstructions }/>
   
          <div onClick={()=>props.setFormPage("Pet1")} className='mt-5 text-right'>
          <Button text="Continue"/>
          </div>
    </form>
  )
}



export default Client