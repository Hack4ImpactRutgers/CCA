import React from 'react'



export default function Header() {
  const pathname = usePathname()
  return (
    <nav className='bg-[var(--primary-color)] no-underline'>
        
        <ul className='p-0 mt-0 h-20 [list-style:none] flex items-center gap-4'>
            <img className='ml-[.5rem] text-[large] no-underline text-[rgb(255,_255,_255)]' src="../../favicon.ico"/>
            
            <Link className={`text-[large] no-underline text-[rgb(255,_255,_255)] hover:bg-[var(--secondary-color)] ${
                  pathname=='volunteer'
                    ? "text-[var(--tertiary-color)] font-bold"
                    : ""
                }`} href="/volunteer">Volunteer</Link>

                
              <Link className={`text-[large] no-underline text-[rgb(255,_255,_255)] hover:bg-[var(--secondary-color)] ${
                  pathname=='client'
                    ? "text-[var(--tertiary-color)] font-bold"
                    : ""
                }`} href="/client">Client</Link>
            <Link className={`text-[large] no-underline text-[rgb(255,_255,_255)] hover:bg-[var(--secondary-color)] ${
                  pathname=='contact'
                    ? "text-[var(--tertiary-color)] font-bold"
                    : ""
                }`} href="/Contact">Contact</Link>
            <Link className={`ml-auto mr-[20px] text-[large] no-underline text-[rgb(255,_255,_255)] hover:bg-[var(--secondary-color)] ${
                  pathname=='volunteer'
                    ? "text-[var(--tertiary-color)] font-bold"
                    : ""
                }`} href="/login">Sign In</Link>

        </ul>

    </nav>
  )
}
