"use client"
import React, {  useEffect, useState  } from 'react'
import {ReactNode} from "react"
import Link from "next/link"
import Client from './Client'
import Pet from './Pet'
import Button from '../components/Button'


export default function DeliveryReportForm() { 
    const [formPage, setFormPage] = useState("Client")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [zipCode, setZipCode] = useState("")
    const [phone, setPhone] = useState("")
    const [instructions, setInstructions] = useState("")
    const [petName1, setPetName1] = useState("")
    const [foodType1, setFoodType1] = useState("")
    const [foodAmount1, setFoodAmount1] = useState("")
    const [petName2, setPetName2] = useState("")
    const [foodType2, setFoodType2] = useState("")
    const [foodAmount2, setFoodAmount2] = useState("")

    const [petName3, setPetName3] = useState("")
    const [foodType3, setFoodType3] = useState("")
    const [foodAmount3, setFoodAmount3] = useState("")
    

  return (
    <div>
      <div className="font-bold flex items-center justify-center border-b-2 border-black">
        <h1>Delivery Report </h1>
      </div>
      <div className="flex h-screen ">
        <div className='flex flex-col  px-8 py-6 w-fit border-r-2 border-black'>
         
            <button className={`text-left ${formPage=="Client" && 'font-bold text-secondary'}`} >Client</button>
            <button className={`text-left ${formPage=="Pet1" && 'font-bold text-secondary'}`}>Pet 1</button>
            <button className={`text-left ${formPage=="Pet2" && 'font-bold text-secondary'}`}>Pet 2</button>
            <button className={`text-left ${formPage=="Pet3" && 'font-bold text-secondary'}`}>Pet 3</button>
            <button className='text-left'>Needs Assessment</button>
            <button className='text-left'>Submit</button>
        
        </div>
        <div className='mx-10 my-5'>
            {formPage=="Client" && <Client first={firstName} setFirst={setFirstName} last = {lastName} setLast={setLastName} address={address} setAddress={setAddress} city={city} setCity={setCity} zip={zipCode} setZip={setZipCode} phone={phone} setPhone={setPhone} instructions={instructions} setInstructions={setInstructions} setFormPage={setFormPage}/>}
            {formPage=="Pet1" && <Pet petName={petName1} setPetName={setPetName1} foodType={foodType1} setFoodType={setFoodType1} foodAmount={foodAmount1} setFoodAmount={setFoodAmount1}  setFormPage={setFormPage} num={1}/>}
            {formPage=="Pet2" && <Pet petName={petName2} setPetName={setPetName2} foodType={foodType2} setFoodType={setFoodType2} foodAmount={foodAmount2} setFoodAmount={setFoodAmount2}  setFormPage={setFormPage} num={2}/>}
            {formPage=="Pet3" && <Pet petName={petName3} setPetName={setPetName3} foodType={foodType3} setFoodType={setFoodType3} foodAmount={foodAmount3} setFoodAmount={setFoodAmount3}  setFormPage={setFormPage} num={3}/>}
            {formPage=="Assessment" }
            {formPage=="Submit"}
      
        </div>
        
        
        
       </div>
       </div>

  )
}


