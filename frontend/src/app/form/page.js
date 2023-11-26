"use client"
import React, {  useEffect, useState  } from 'react'
import {ReactNode} from "react"
import Link from "next/link"
import Client from './client'


export default function DeliveryReportForm() { 
    const [formPage, setFormPage] = useState("Client")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [phone, setPhone] = useState("")
    const [instructions, setInstructions] = useState("")
    
    useEffect(()=>{
        console.log(firstName)
        console.log(lastName)
        console.log(address)
        console.log(city)
        console.log(zipCode)
        console.log(phone)
        console.log(instructions)
    }
    ,[firstName])
  return (
    <div>
      <div className="font-bold flex items-center justify-center border-b-2 border-black">
        <h1>Delivery Report </h1>
      </div>
      <div className="flex h-screen ">
        <div className='flex flex-col  px-8 py-6 w-fit border-r-2 border-black'>
         
            <button  className={`text-left ${formPage=="Client" }`} >Client</button>
            <button className='text-left'>Pet 1</button>
            <button className='text-left'>Pet 2</button>
            <button className='text-left'>Pet 3</button>
            <button className='text-left'>Needs Assessment</button>
            <button className='text-left'>Submit</button>
        
        </div>
        <div className='mx-10 my-5'>
            {formPage=="Client" && <Client first={firstName} setFirst={setFirstName} last = {lastName} setLast={setLastName} address={address} setAddress={setAddress} city={city} setCity={setCity} zip={zipCode} setZip={setZipCode} phone={phone} setPhone={setPhone} instructions={instructions} setInstructions={setInstructions}/>}
            {formPage=="Pet1" && <Client/>}
            {formPage=="Pet2" && <Client/>}
            {formPage=="Pet3" && <Client/>}
            {formPage=="Assessment" && <Client/>}
            {formPage=="Submit" && <Client/>}
      
        </div>
        
       </div>
       </div>

  )
}


