import React from 'react'
import Link from 'next/link'
import {usePathname} from "next/navigation";
import Image from 'next/image';
import imageAnimals from '/public/images/animals-48x48.png';


export default function Header() {
  const pathname = usePathname()

  return (
    <nav className='font-primary bg-[var(--primary-color)] no-underline'>

        <ul className='p-0 mt-0 h-20 list-none flex items-center gap-4'>
            <Image alt="image" className='ml-[.5rem] text-[large] no-underline text-[rgb(255,_255,_255)] h-[70px] w-[70px]' src={imageAnimals}/>


            <Link className={`text-[large] ml-auto no-underline text-[rgb(255,_255,_255)] hover:bg-[var(--secondary-color)] ${
                  pathname=='volunteer'
                    ? "text-[var(--tertiary-color)] font-bold"
                    : ""
                }`} href="/volunteer">Volunteer</Link>


            <Link className={`text-[large] no-underline text-[rgb(255,_255,_255)] hover:bg-[var(--secondary-color)] ${
                pathname=='client' && "text-[var(--tertiary-color)] font-bold"
                
            }`} href="/client">Client</Link>


            <Link className={`text-[large] no-underline text-[rgb(255,_255,_255)] hover:bg-[var(--secondary-color)] ${
                  pathname=='contact'
                    ? "text-[var(--tertiary-color)] font-bold"
                    : ""
                }`} href="/Contact">Contact</Link>


            <Link className={`font-secondary ml-auto mr-[20px] text-[larger] no-underline text-[var(--tertiary-color)] hover:bg-[var(--secondary-color)] ${
                  pathname=='volunteer'
                    ? "text-[var(--tertiary-color)] font-bold"
                    : ""
                }`} href="/login">SIGN IN</Link>

        </ul>

    </nav>
  )
}