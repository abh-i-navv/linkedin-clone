
import React from 'react'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import Link from 'next/link';
import { Button } from './ui/button';

interface Props{
    user: {
        name: string;
        bio: string;
    }
}

function UserInfo({user} : Props) {

    // const session = useSession();
    // const user = session.data?.user;
    // console.log(session);

    console.log(user);

    return (
        <>
        {user.name ? <div className='bg-white flex flex-col items-center justify-center p-4 m-6 rounded-lg border min-w-[100px]'>
            <Avatar>
                <AvatarImage src="/avatar.svg" height={50} width={50}/>
            </Avatar>
            
            <div className='m-2 p-2'>
                <Link className='hover:underline' href={`/user/${user.name}`}>@{user.name}</Link>
            </div>

            <div>
                <span className='text-lg font-semibold text-gray-800 mb-2'>Bio: </span>
                {user.bio}
            </div>

        </div>:
            <div className='bg-white flex flex-col items-center justify-center p-4 m-6 rounded-lg border min-w-[100px]'>
            <Avatar>
                <AvatarImage src="/avatar.svg" height={50} width={50}/>
            </Avatar>
            
            <div className='m-2 p-2'>
                <Link className='hover:underline' href={`/login`}><Button className='m-5'>Sign In</Button></Link>
            </div>

        </div>
        }

        </>
    )
}

export default UserInfo