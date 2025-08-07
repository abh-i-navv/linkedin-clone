"use client"

import Image from 'next/image'
import React from 'react'
import { HomeIcon} from 'lucide-react'
import Link from 'next/link'
import { UserAvatar } from './UserAvatar'

function Header() {

    return (
        <div className='flex items-center justify-between p-2 max-w-6xl mx-auto'>
            <Image
            src="/logo.svg"
            alt="LinkedIn Logo"
            width={40}
            height={40}
            className="rounded-md"></Image>

            <div className='flex items-center space-x-4 ml-4'>
                <Link href="/">
                    <HomeIcon className='h-5'></HomeIcon>
                </Link>

                <UserAvatar />
                

            </div>

        </div>
    )
}

export default Header