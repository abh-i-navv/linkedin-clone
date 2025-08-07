"use client"
import React, { useState } from 'react'
import { Button } from './ui/button'
import { useSession } from 'next-auth/react';
import axios from 'axios';


function PostForm() {

    const [content,setContent] = useState('');

    const session = useSession();
    const user = session.data?.user;

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!user){
            return alert('You must be logged in to post');
        }
        const data = {content: content}
        try {
            const res = await axios.post("/api/post",data)
            location.reload()

            if(res.data){
                setContent('')
            }
        } catch (error) {
            console.error("Failed to create post", error)
        }
    }

  return (
    <div>
        {user && <form className="bg-white p-6 rounded-lg shadow-md" onSubmit={handleSubmit}>
            <h2 className="text-xl font-semibold mb-4">Create a Post</h2>
            <textarea
                className="w-full p-3 border border-gray-300 rounded-lg mb-4"
                rows={4}
                placeholder="What's on your mind?"
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <Button type='submit' className='w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200'>Post</Button>

        </form>}
    </div>
  )
}

export default PostForm