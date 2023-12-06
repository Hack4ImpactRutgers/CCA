"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import Button from '../components/Button'
import TextInput from '../components/TextInput'



interface InformationProps {
    setFormPage: Dispatch<SetStateAction<string>>;
}


function Information(props: InformationProps) {
  

  

  return (
    <form className="">
      <div className='text-lg'>
        Pet Needs
      </div>
        Which of the following do you need help with?
        <div onClick={()=>props.setFormPage("Pet1")} className='mt-5 text-right'>
          <Button text="Continue"/>
          </div>
    </form>
  )
}



export default Information
