// app/login/page.tsx

'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Loader2Icon } from 'lucide-react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<boolean | null>(false)

  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const result = await signIn("credentials", {
        email,
        password,
        redirect: false
    })

    if (result?.error) {
      console.log(result.error);
      setError(true)
    } else {
        setError(false)
      router.push("/");
    }
    setLoading(false)

  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a66c2]">
      <div className="w-full max-w-md p-8 space-y-6 bg-white border border-gray-200 rounded-lg shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-blue-700">LinkedIn</h1>
          <p className="mt-2 text-sm text-gray-500">Sign in to your account</p>
          { error && (
            <p className="text-red-500 text-sm mt-2">Invalid email or password</p>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              placeholder="*********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {loading ? (<Button className='w-full' size="sm" disabled>
            <Loader2Icon className="animate-spin" />
            Please wait
            </Button>) : (<Button type="submit" className="w-full">
            Sign in
          </Button> )}
        </form>

        <div className="text-center text-sm text-gray-500">
          New to LinkedIn?{' '}
          <a href="/register" className="text-blue-700 hover:underline">
            Join now
          </a>
        </div>
      </div>
    </div>
  )
}
