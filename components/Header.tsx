import Link from 'next/link'
import Image from 'next/image'
import React from 'react'
import Navitems from './Navitems'
import UserDropdown from "@/components/UserDropdown"

const Header = () => {
  return (
    <header className='sticky top-0 header'>
      <div className='flex justify-between items-center container py-4'>
        <Link href="/">
          <Image src="/icon.png" alt="Logo" width={140} height={32} className='h-8 w-auto cursor-pointer'/>
        </Link>
        <nav className='hidden sm:block'>
          <Navitems />
        </nav>
        <UserDropdown/>
      </div>

    </header>
  )
}

export default Header