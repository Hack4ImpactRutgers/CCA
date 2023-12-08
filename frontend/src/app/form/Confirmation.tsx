import React from 'react'
import Button from '../components/Button'

interface ConfirmationProps {
    
   
}

function Confirmation(props: ConfirmationProps) {
  return (
    <div className='h-screen flex flex-col justify-center items-center'>
        <img src="/images/confirmation.png"/>
        <div className='font-bold'>Form submitted!</div>
        <div>Thank You!</div>
    <div onClick={()=>window.location.reload()} className='content-center'>
          <Button text="Fill out another form"/>
          </div>
          </div>
  )
}

export default Confirmation