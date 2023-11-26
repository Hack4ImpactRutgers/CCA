"use client"
import React from 'react'
import {ReactNode} from "react"
import Link from "next/link"

type FormProps = {
    children: React.ReactNode
  }

export default function DeliveryReportForm({children}: FormProps) { 
  return (
    <div>
      <div className="font-bold flex items-center justify-center border-b-2 border-black">
        <h1>Delivery Report </h1>
      </div>
      <div className="flex h-screen ">
        <div className='flex flex-col px-8 py-6 w-fit border-r-2 border-black'>
          <Link href='/form/client'>
            <p>Client</p>
          </Link>
          <Link href='/form/pet1'>
            <p>Pet 1</p>
          </Link>
        </div>
        <div className='mx-10 my-5'>
        {children}
        </div>
        
       </div>
       </div>

  )
}


