"use client"
import React, { useEffect, useState } from 'react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react';
import axios from 'axios';
import type { Post } from '@/models/Post';
import Link from 'next/link';
import { Trash } from 'lucide-react';

export default function UserPost() {

    const [posts,setPosts] = useState<Post[] | null>(null);
    const session = useSession()
    const user = session?.data?.user
  
    

    useEffect(() => {
      const getUserPosts = async () => {
        try {
            const response = await axios.get("/api/get-user-post")
    
            if(response.data.posts){
                setPosts(response.data.posts)
            }
            else{
                setPosts([]);
            }
        } catch (error) {
            console.error("Failed to fetch user posts:", error);
            setPosts([]);
        }
    }
        getUserPosts()
    },[])

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
     <div className="space-y-4 mt-4">
      {!posts ? (
        <p className="text-gray-500">Loading your posts...</p>
      ) : posts.length === 0 ? (
        <p className="text-gray-500">You have not posted anything yet.</p>
      ) : (
        posts.map((post) => (
          <div
            key={post._id}
            className="flex justify-between items-start p-4 border rounded-md shadow-sm bg-white"
          >
            <div>
              <p className="text-sm text-gray-800">{post.content}</p>
              <p className="text-xs text-gray-400 mt-1">
                
              </p>
              <p className="text-xs text-gray-400 mt-2">
                Posted by <Link className='hover:underline' href={`/user/${post.author.name}`}>@{post.author.name}</Link> on {new Date(post.createdAt).toLocaleString()}
              </p>
            </div>

            {post.author.name === user?.name && 
            <Button variant='destructive' className='h-6 w-6 hover:text-red-200' onClick={() => handleDelete(post._id)}>
              <Trash></Trash>
            </Button>}
          </div>
        ))
      )}
    </div>
  )
}