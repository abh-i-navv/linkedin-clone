// app/register/page.tsx

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<boolean | null>(null)
  const [success, setSuccess] = useState<boolean | null>(null)
  const [bio, setBio] = useState('')

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const data = {
        name,
        email,
        password,
        bio
      }
      const response = await axios.post('/api/auth/register', data)
      setSuccess(true)
      setError(false)
      console.log("Response",response)
      
      router.push('/login') 

    } catch (error) {
      setError(true)
      console.error("Registration error:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a66c2]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-700">LinkedIn</h1>
          <p className="mt-2 text-sm text-gray-500">Make the most of your professional life</p>
          {success && (
            <p className="text-green-500 text-sm mt-2">User registered successfully</p>
          )}
          {error && (
            <p className="text-red-500 text-sm mt-2">Registration failed. Please try again.</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <textarea
              id="bio"
              className="w-full p-2 border border-gray-300 rounded-md min-h-[50px]"
              placeholder="Tell us a bit about yourself"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>

          <Button type="submit" className="w-full">
            Join now
          </Button>
        </form>

        <div className="text-center text-sm text-gray-500">
          Already a member?{' '}
          <Link href="/login" className="text-blue-700 hover:underline">
            Log In
          </Link>
        </div>
      </div>
    </div>
  )
}
