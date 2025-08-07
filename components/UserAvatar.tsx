'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { UserIcon } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

export function UserAvatar() {
  const { data: session } = useSession();

  const user = session?.user;
  const router = useRouter();

  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="cursor-pointer h-8 w-8">
            <AvatarFallback>
              <UserIcon className='h-4 w-4'></UserIcon>
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuItem disabled>
            <span className="text-sm font-black">{user?.name}</span>
          </DropdownMenuItem>
          <DropdownMenuItem disabled>
            <span className="text-sm font-black ">{user?.email}</span>
          </DropdownMenuItem>
          <DropdownMenuItem >

            {session?.user ? 
              <Button className='w-full' onClick={() => signOut({ callbackUrl: '/login' })}> Sign Out</Button> : 
              <Button className='w-full' onClick={() => router.push('/login')}>
                Sign In </Button>
            }

            
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
  );
}
