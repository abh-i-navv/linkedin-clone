"use client"
import { Button } from '@/components/ui/button';
import UserInfo from '@/components/UserInfo';
import { Post } from '@/models/Post';
import axios from 'axios';
import {Trash } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

interface Props{
    username: string;
}

interface User{
  name: string;
  bio: string;
}

function UserProfile({username}: Props) {

   const [posts,setPosts] = useState<Post[] | null>(null);
   const [user,setUser] = useState<User>();

    const session = useSession()
    const currUser = session?.data?.user
    

    useEffect(() => {
      if (username === currUser?.name) {
        setUser({
          name: currUser.name,
          bio: currUser.bio!
        });
      } else {
        const getUser = async () => {
          try {
            const response = await axios.get(`/api/get-user`, {params: {username}});
            setUser(response.data);
          } catch (error) {
            console.error("Failed to fetch user:", error);
          }
        };
        getUser();
      }

      const getUserPosts = async () => {
        try {
          const response = await axios.get(`/api/get-user-post`, {params: {username}});
          setPosts(response.data.posts || []);
        } catch (error) {
          console.error("Failed to fetch user posts:", error);
          setPosts([]);
        }
      };
      getUserPosts();
    }, [username, currUser]);


    const handleDelete = async (postId: string) => {
      try {
            const response = await axios.delete("/api/delete-post", {
              data: { id: postId }, 
            });

            if (response.status === 200) {
          
              setPosts(prev => prev?.filter(p => p._id !== postId) || null);
            }
      } catch (error) {
        console.error("Failed to delete post:", error);
      }
    };


  return (
    <div className="hidden md:grid md:grid-cols-8">
        <div className="grid col-span-2">
            {user && <UserInfo user={user}/>}
            
        </div>

        <div className="flex flex-col col-span-4">
          <h1 className="text-2xl font-bold mb-4 flex items-center justify-center w-full bg-white p-4 border rounded-md shadow-sm" >Posts by {username}</h1>
            {!posts ? (
              <p className="text-gray-500">Loading your posts...</p>) :
               posts.length === 0 ? (
              <p className="text-gray-500">You have not posted anything yet.</p>) : 
              (
              posts.map((post) => (
                <div
                  key={post._id}
                  className="flex justify-between p-4 border rounded-md shadow-sm bg-white w-full h-auto">
                  <div>
                    <p className="text-sm text-gray-800">{post.content}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      Created on {new Date(post.createdAt).toLocaleString()}
                    </p>
                  </div>
                  
                  {username === currUser?.name && <Button variant='destructive' className='h-6 w-6 hover:text-red-200' onClick={() => handleDelete(post._id)}>
                    <Trash></Trash>
                  </Button>}

                </div>
              ))
            )}
        </div>

    </div> 
  )
}

export default UserProfile