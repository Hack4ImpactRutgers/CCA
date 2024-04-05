import React from 'react'
import {Button} from '../../components/core/Button'

interface ConfirmationProps {
    
   
}

function Confirmation(props: ConfirmationProps) {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <img src="/images/confirmation.png"/>
        <div className='mt-5 font-bold'>Form submitted!</div>
        <div className='mt-5'>Thank You!</div>
    <div onClick={()=>window.location.reload()} className=' mt-5 content-center'>
          <Button text="Go to dashboard"/>
          </div>
          </div>
  )
}

export default Confirmation