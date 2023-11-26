import React from 'react'

function Client() {
  return (
    <form className="">
     
   
      <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
        Pet Name
      </div>
      <input type="text" required/>

  
          <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          Type of Food
          </div>
          <input type="text" required/>


     

      

      <div className='mt-5 after:content-["*"] after:text-[red] after:ml-0.5'>
          Amount of Food Per Month
          </div>
          <input type="text" required/>

 
   
    </form>
  )
}



export default Client
